import { getSupabaseBrowserClient } from "@/lib/supabase";
import {
  listApprovedCategories,
  type CategoryRecord,
  type Difficulty,
  type PointValue,
  type SubmissionStatus,
  type UserRole,
} from "@/lib/content";

export interface ProfileRecord {
  id: string;
  display_name: string | null;
  role: UserRole;
}

export interface SubmissionCategoryOption {
  id: string;
  name: string;
  status: SubmissionStatus;
  isAfterDark: boolean;
}

export interface CategorySubmissionInput {
  name: string;
  icon: string;
  difficulty: Difficulty;
  isAfterDark: boolean;
  categoryImageUrl?: string;
}

export interface QuestionSubmissionInput {
  categoryId: string;
  pointValue: PointValue;
  text: string;
  answer: string;
  acceptedAnswers?: string[];
  imageUrl?: string;
  funFact?: string;
}

export interface PendingCategoryReview {
  id: string;
  name: string;
  slug: string;
  icon: string;
  difficulty: Difficulty;
  isAfterDark: boolean;
  categoryImageUrl?: string;
  createdAt: string;
  submittedBy: string;
  reviewNotes?: string;
}

export interface PendingQuestionReview {
  id: string;
  categoryId: string;
  categoryName: string;
  pointValue: PointValue;
  text: string;
  answer: string;
  acceptedAnswers?: string[];
  imageUrl?: string;
  funFact?: string;
  createdAt: string;
  submittedBy: string;
  reviewNotes?: string;
}

const slugify = (value: string) => {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "community-category";
};

const normalizeAcceptedAnswers = (answers?: string[]) =>
  (answers ?? []).map((answer) => answer.trim()).filter(Boolean);

const getAuthenticatedUser = async () => {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  if (!user) {
    throw new Error("Sign in required.");
  }

  return { supabase, user };
};

const mapCategoryRecord = (category: CategoryRecord): SubmissionCategoryOption => ({
  id: category.id,
  name: category.name,
  status: "approved",
  isAfterDark: category.is_after_dark,
});

const listOwnPendingCategories = async (): Promise<CategoryRecord[]> => {
  const { supabase, user } = await getAuthenticatedUser();
  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, slug, name, icon, difficulty, is_after_dark, category_image_url, created_at"
    )
    .eq("submitted_by", user.id)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load your pending categories: ${error.message}`);
  }

  return (data ?? []) as CategoryRecord[];
};

export const signInWithPassword = async (email: string, password: string) => {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error(error.message);
  }
};

export const signUpWithPassword = async (
  email: string,
  password: string,
  displayName: string
) => {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const sendEmailCode = async ({
  email,
  displayName,
  shouldCreateUser,
}: {
  email: string;
  displayName?: string;
  shouldCreateUser: boolean;
}) => {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser,
      data: displayName ? { display_name: displayName } : undefined,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const verifyEmailCode = async (email: string, token: string) => {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const signOut = async () => {
  const supabase = getSupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const getMyProfile = async (): Promise<ProfileRecord | null> => {
  const supabase = getSupabaseBrowserClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(userError.message);
  }

  if (!user) {
    return null;
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, role")
    .eq("id", user.id)
    .single();

  if (error) {
    throw new Error(`Failed to load your profile: ${error.message}`);
  }

  return data as ProfileRecord;
};

export const listSubmissionCategories = async (): Promise<SubmissionCategoryOption[]> => {
  const [approvedCategories, pendingCategories] = await Promise.all([
    listApprovedCategories(),
    listOwnPendingCategories(),
  ]);

  const options = new Map<string, SubmissionCategoryOption>();

  for (const category of approvedCategories) {
    options.set(category.id, mapCategoryRecord(category));
  }

  for (const category of pendingCategories) {
    options.set(category.id, {
      id: category.id,
      name: category.name,
      status: "pending",
      isAfterDark: category.is_after_dark,
    });
  }

  return [...options.values()];
};

export const submitCategory = async (input: CategorySubmissionInput) => {
  const { supabase, user } = await getAuthenticatedUser();
  const slug = `${slugify(input.name)}-${Date.now().toString(36)}`;
  const { error } = await supabase.from("categories").insert({
    slug,
    name: input.name.trim(),
    icon: input.icon.trim() || "HelpCircle",
    difficulty: input.difficulty,
    is_after_dark: input.isAfterDark,
    category_image_url: input.categoryImageUrl?.trim() || null,
    status: "pending",
    submitted_by: user.id,
  });

  if (error) {
    throw new Error(`Failed to submit category: ${error.message}`);
  }
};

export const submitQuestion = async (input: QuestionSubmissionInput) => {
  const { supabase, user } = await getAuthenticatedUser();
  const { error } = await supabase.from("questions").insert({
    category_id: input.categoryId,
    point_value: input.pointValue,
    text: input.text.trim(),
    answer: input.answer.trim(),
    accepted_answers: normalizeAcceptedAnswers(input.acceptedAnswers),
    image_url: input.imageUrl?.trim() || null,
    fun_fact: input.funFact?.trim() || null,
    status: "pending",
    submitted_by: user.id,
  });

  if (error) {
    throw new Error(`Failed to submit question: ${error.message}`);
  }
};

export const listPendingCategoriesForReview = async (): Promise<PendingCategoryReview[]> => {
  const { supabase } = await getAuthenticatedUser();
  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, name, slug, icon, difficulty, is_after_dark, category_image_url, created_at, submitted_by, review_notes"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load pending categories: ${error.message}`);
  }

  return (data ?? []).map((category: any) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    icon: category.icon,
    difficulty: category.difficulty,
    isAfterDark: category.is_after_dark,
    categoryImageUrl: category.category_image_url ?? undefined,
    createdAt: category.created_at,
    submittedBy: category.submitted_by,
    reviewNotes: category.review_notes ?? undefined,
  }));
};

export const listPendingQuestionsForReview = async (): Promise<PendingQuestionReview[]> => {
  const { supabase } = await getAuthenticatedUser();
  const { data, error } = await supabase
    .from("questions")
    .select(
      "id, category_id, point_value, text, answer, accepted_answers, image_url, fun_fact, created_at, submitted_by, review_notes, categories(name)"
    )
    .eq("status", "pending")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load pending questions: ${error.message}`);
  }

  return (data ?? []).map((question: any) => ({
    id: question.id,
    categoryId: question.category_id,
    categoryName: question.categories?.name ?? "Unknown category",
    pointValue: question.point_value,
    text: question.text,
    answer: question.answer,
    acceptedAnswers:
      question.accepted_answers && question.accepted_answers.length > 0
        ? question.accepted_answers
        : undefined,
    imageUrl: question.image_url ?? undefined,
    funFact: question.fun_fact ?? undefined,
    createdAt: question.created_at,
    submittedBy: question.submitted_by,
    reviewNotes: question.review_notes ?? undefined,
  }));
};

export const reviewCategorySubmission = async (
  id: string,
  decision: Exclude<SubmissionStatus, "pending">,
  notes: string
) => {
  const { supabase, user } = await getAuthenticatedUser();
  const { error } = await supabase
    .from("categories")
    .update({
      status: decision,
      review_notes: notes.trim() || null,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to ${decision} category: ${error.message}`);
  }
};

export const reviewQuestionSubmission = async (
  id: string,
  decision: Exclude<SubmissionStatus, "pending">,
  notes: string
) => {
  const { supabase, user } = await getAuthenticatedUser();
  const { error } = await supabase
    .from("questions")
    .update({
      status: decision,
      review_notes: notes.trim() || null,
      reviewed_by: user.id,
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    throw new Error(`Failed to ${decision} question: ${error.message}`);
  }
};

