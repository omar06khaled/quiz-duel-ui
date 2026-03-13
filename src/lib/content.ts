import { getSupabaseBrowserClient } from "@/lib/supabase";

export const POINTS = [200, 400, 600] as const;

export type PointValue = (typeof POINTS)[number];
export type SubmissionStatus = "pending" | "approved" | "rejected";
export type UserRole = "player" | "reviewer" | "admin";
export type Difficulty = "easy" | "medium" | "hard";

export interface PlayableQuestion {
  id: string;
  text: string;
  answer: string;
  image: string;
  funFact?: string;
  acceptedAnswers?: string[];
}

export interface PlayableCategory {
  id: string;
  slug: string;
  name: string;
  icon: string;
  difficulty: Difficulty;
  isNew: boolean;
  isPopular: boolean;
  isAfterDark: boolean;
  categoryImage: string;
  questions: Record<PointValue, PlayableQuestion[]>;
}

export interface CategoryRecord {
  id: string;
  slug: string;
  name: string;
  icon: string | null;
  difficulty: Difficulty;
  is_after_dark: boolean;
  category_image_url: string | null;
  created_at: string;
}

export interface QuestionRecord {
  id: string;
  category_id: string;
  point_value: PointValue;
  text: string;
  answer: string;
  accepted_answers: string[] | null;
  image_url: string | null;
  fun_fact: string | null;
  created_at: string;
}

const PLACEHOLDER_IMAGE = "/placeholder.svg";
const NEW_CATEGORY_WINDOW_DAYS = 30;
const POPULAR_QUESTION_THRESHOLD = 9;

const createEmptyQuestionBuckets = (): Record<PointValue, PlayableQuestion[]> => ({
  200: [],
  400: [],
  600: [],
});

const isSupportedPointValue = (value: number): value is PointValue =>
  POINTS.includes(value as PointValue);

const isNewCategory = (createdAt: string) => {
  const createdAtTimestamp = new Date(createdAt).getTime();

  if (Number.isNaN(createdAtTimestamp)) {
    return false;
  }

  const windowMs = NEW_CATEGORY_WINDOW_DAYS * 24 * 60 * 60 * 1000;
  return Date.now() - createdAtTimestamp <= windowMs;
};

const toPlayableQuestion = (question: QuestionRecord): PlayableQuestion => ({
  id: question.id,
  text: question.text,
  answer: question.answer,
  image: question.image_url ?? PLACEHOLDER_IMAGE,
  funFact: question.fun_fact ?? undefined,
  acceptedAnswers:
    question.accepted_answers && question.accepted_answers.length > 0
      ? question.accepted_answers
      : undefined,
});

export const buildPlayableCategoryLibrary = (
  categoryRows: CategoryRecord[],
  questionRows: QuestionRecord[]
): PlayableCategory[] => {
  const groupedQuestions = new Map<string, Record<PointValue, PlayableQuestion[]>>();

  for (const question of questionRows) {
    if (!isSupportedPointValue(question.point_value)) {
      continue;
    }

    const currentBuckets =
      groupedQuestions.get(question.category_id) ?? createEmptyQuestionBuckets();

    currentBuckets[question.point_value].push(toPlayableQuestion(question));
    groupedQuestions.set(question.category_id, currentBuckets);
  }

  return categoryRows
    .map((category) => {
      const questions = groupedQuestions.get(category.id) ?? createEmptyQuestionBuckets();
      const totalQuestionCount = POINTS.reduce(
        (count, pointValue) => count + questions[pointValue].length,
        0
      );

      return {
        id: category.id,
        slug: category.slug,
        name: category.name,
        icon: category.icon ?? "HelpCircle",
        difficulty: category.difficulty,
        isAfterDark: category.is_after_dark,
        categoryImage: category.category_image_url ?? PLACEHOLDER_IMAGE,
        isNew: isNewCategory(category.created_at),
        isPopular: totalQuestionCount >= POPULAR_QUESTION_THRESHOLD,
        questions,
      };
    })
    .filter((category) =>
      POINTS.every((pointValue) => category.questions[pointValue].length > 0)
    );
};

export const listApprovedCategories = async (): Promise<CategoryRecord[]> => {
  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, slug, name, icon, difficulty, is_after_dark, category_image_url, created_at"
    )
    .eq("status", "approved")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load approved categories: ${error.message}`);
  }

  return (data ?? []) as CategoryRecord[];
};

export const listApprovedQuestions = async (
  categoryIds: string[]
): Promise<QuestionRecord[]> => {
  if (categoryIds.length === 0) {
    return [];
  }

  const supabase = getSupabaseBrowserClient();
  const { data, error } = await supabase
    .from("questions")
    .select(
      "id, category_id, point_value, text, answer, accepted_answers, image_url, fun_fact, created_at"
    )
    .eq("status", "approved")
    .in("category_id", categoryIds)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Failed to load approved questions: ${error.message}`);
  }

  return (data ?? []) as QuestionRecord[];
};

export const fetchApprovedCategoryLibrary = async (): Promise<PlayableCategory[]> => {
  const categories = await listApprovedCategories();

  if (categories.length === 0) {
    return [];
  }

  const questions = await listApprovedQuestions(categories.map((category) => category.id));
  return buildPlayableCategoryLibrary(categories, questions);
};
