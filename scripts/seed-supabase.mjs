import { createHash } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { CATEGORY_LIBRARY, POINTS } from "../src/data/categories.ts";

const requiredEnv = [
  "VITE_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_SEED_USER_EMAIL",
];

for (const envName of requiredEnv) {
  if (!process.env[envName]) {
    throw new Error(`Missing required environment variable: ${envName}`);
  }
}

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const deterministicUuid = (value) => {
  const hex = createHash("sha1").update(value).digest("hex").slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`;
};

const findSeedUser = async (email) => {
  const { data, error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1000,
  });

  if (error) {
    throw new Error(`Failed to list Supabase users: ${error.message}`);
  }

  const user = data.users.find((entry) => entry.email?.toLowerCase() === email.toLowerCase());

  if (!user) {
    throw new Error(
      `Could not find a Supabase auth user for ${email}. Create that user in Authentication first.`
    );
  }

  return user;
};

const ensureSeedProfile = async (user) => {
  const displayName = user.user_metadata?.display_name ?? user.email?.split("@")[0] ?? "admin";
  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      display_name: displayName,
      role: "admin",
    },
    {
      onConflict: "id",
    }
  );

  if (error) {
    throw new Error(`Failed to upsert seed profile: ${error.message}`);
  }
};

const categoryRows = (submittedBy, reviewedAt) =>
  CATEGORY_LIBRARY.map((category) => ({
    id: deterministicUuid(`legacy-category:${category.id}`),
    slug: category.id,
    name: category.name,
    icon: category.icon,
    difficulty: category.difficulty,
    is_after_dark: category.isAfterDark,
    category_image_url: category.categoryImage,
    status: "approved",
    submitted_by: submittedBy,
    reviewed_by: submittedBy,
    review_notes: "Imported from legacy CATEGORY_LIBRARY data.",
    reviewed_at: reviewedAt,
  }));

const questionRows = (submittedBy, reviewedAt) =>
  CATEGORY_LIBRARY.flatMap((category) => {
    const categoryId = deterministicUuid(`legacy-category:${category.id}`);

    return POINTS.flatMap((pointValue) =>
      category.questions[pointValue].map((question) => ({
        id: deterministicUuid(`legacy-question:${question.id}`),
        category_id: categoryId,
        point_value: pointValue,
        text: question.text,
        answer: question.answer,
        accepted_answers: question.acceptedAnswers ?? [],
        image_url: question.image,
        fun_fact: question.funFact ?? null,
        status: "approved",
        submitted_by: submittedBy,
        reviewed_by: submittedBy,
        review_notes: "Imported from legacy CATEGORY_LIBRARY data.",
        reviewed_at: reviewedAt,
      }))
    );
  });

const seed = async () => {
  const seedEmail = process.env.SUPABASE_SEED_USER_EMAIL;
  const reviewedAt = new Date().toISOString();
  const user = await findSeedUser(seedEmail);

  await ensureSeedProfile(user);

  const categories = categoryRows(user.id, reviewedAt);
  const questions = questionRows(user.id, reviewedAt);

  const { error: categoriesError } = await supabase.from("categories").upsert(categories, {
    onConflict: "id",
  });

  if (categoriesError) {
    throw new Error(`Failed to seed categories: ${categoriesError.message}`);
  }

  const { error: questionsError } = await supabase.from("questions").upsert(questions, {
    onConflict: "id",
  });

  if (questionsError) {
    throw new Error(`Failed to seed questions: ${questionsError.message}`);
  }

  console.log(
    `Seeded ${categories.length} categories and ${questions.length} questions as approved content.`
  );
};

seed().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
