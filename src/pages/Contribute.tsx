import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthCard } from "@/components/auth/AuthCard";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import {
  getMyProfile,
  listSubmissionCategories,
  signOut,
  submitCategory,
  submitQuestion,
} from "@/lib/community";
import { POINTS, type Difficulty } from "@/lib/content";
import { hasSupabaseConfig } from "@/lib/supabase";

const DEFAULT_CATEGORY_FORM = {
  name: "",
  icon: "HelpCircle",
  difficulty: "medium" as Difficulty,
  isAfterDark: false,
  categoryImageUrl: "",
};

const DEFAULT_QUESTION_FORM = {
  categoryId: "",
  pointValue: 200 as (typeof POINTS)[number],
  text: "",
  answer: "",
  acceptedAnswers: "",
  imageUrl: "",
  funFact: "",
};

const formatStatusLabel = (status: string) =>
  status === "pending" ? "Pending review" : "Approved";

const Contribute = () => {
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading } = useSupabaseAuth();
  const [categoryForm, setCategoryForm] = useState(DEFAULT_CATEGORY_FORM);
  const [questionForm, setQuestionForm] = useState(DEFAULT_QUESTION_FORM);
  const [categoryMessage, setCategoryMessage] = useState<string | null>(null);
  const [questionMessage, setQuestionMessage] = useState<string | null>(null);

  const profileQuery = useQuery({
    queryKey: ["my-profile", user?.id],
    queryFn: getMyProfile,
    enabled: Boolean(user),
    retry: false,
  });

  const submissionCategoriesQuery = useQuery({
    queryKey: ["submission-categories", user?.id],
    queryFn: listSubmissionCategories,
    enabled: Boolean(user),
    retry: false,
  });

  const signOutMutation = useMutation({
    mutationFn: signOut,
  });

  const submitCategoryMutation = useMutation({
    mutationFn: submitCategory,
    onSuccess: () => {
      setCategoryForm(DEFAULT_CATEGORY_FORM);
      setCategoryMessage("Category submitted for review.");
      queryClient.invalidateQueries({ queryKey: ["submission-categories"] });
    },
  });

  const submitQuestionMutation = useMutation({
    mutationFn: submitQuestion,
    onSuccess: () => {
      setQuestionForm(DEFAULT_QUESTION_FORM);
      setQuestionMessage("Question submitted for review.");
    },
  });

  const categoryOptions = submissionCategoriesQuery.data ?? [];

  const questionCategoryOptions = useMemo(() => {
    return categoryOptions.map((category) => ({
      ...category,
      label: `${category.name} (${formatStatusLabel(category.status)})`,
    }));
  }, [categoryOptions]);

  if (!hasSupabaseConfig) {
    return (
      <div className="glass-page-bg flex min-h-[100dvh] items-center justify-center px-4 py-8">
        <div className="glass-panel max-w-xl rounded-2xl p-6 text-center text-white">
          <h1 className="font-display text-3xl font-bold">Supabase config missing</h1>
          <p className="mt-3 text-white/70">
            Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your `.env` file before using submissions.
          </p>
          <Link className="glass-action mt-5 inline-flex rounded-xl px-4 py-2 text-sm font-semibold" to="/">
            Back to game
          </Link>
        </div>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="glass-page-bg flex min-h-[100dvh] items-center justify-center px-4 py-8">
        <div className="glass-panel rounded-2xl px-6 py-4 text-sm text-white/75">Loading account...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="glass-page-bg flex min-h-[100dvh] items-center justify-center px-4 py-8">
        <div className="w-full max-w-xl space-y-4">
          <AuthCard
            title="Contribute to the question library"
            description="Sign in to submit new categories and questions for review."
          />
          <div className="text-center">
            <Link className="text-sm text-white/60 hover:text-white" to="/">
              Back to game
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-page-bg min-h-[100dvh] px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-white/45">Community mode</p>
            <h1 className="font-display text-4xl font-bold text-white">Submit categories and questions</h1>
            <p className="mt-2 text-sm text-white/70">
              Signed in as {profileQuery.data?.display_name ?? user.email}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="glass-action rounded-xl px-4 py-2 text-sm font-semibold" to="/">
              Back to game
            </Link>
            <button
              onClick={() => signOutMutation.mutate()}
              className="glass-action rounded-xl px-4 py-2 text-sm font-semibold text-white/80"
            >
              Sign out
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="glass-panel rounded-2xl p-6">
            <h2 className="font-display text-2xl font-bold text-white">New category</h2>
            <p className="mt-2 text-sm text-white/65">
              Categories stay hidden from gameplay until a reviewer approves them.
            </p>

            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setCategoryMessage(null);
                submitCategoryMutation.mutate({
                  name: categoryForm.name,
                  icon: categoryForm.icon,
                  difficulty: categoryForm.difficulty,
                  isAfterDark: categoryForm.isAfterDark,
                  categoryImageUrl: categoryForm.categoryImageUrl,
                });
              }}
            >
              <label className="block text-sm text-white/75">
                Name
                <input
                  required
                  value={categoryForm.name}
                  onChange={(event) =>
                    setCategoryForm((prev) => ({ ...prev, name: event.target.value }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                  placeholder="Science Legends"
                />
              </label>

              <label className="block text-sm text-white/75">
                Icon name
                <input
                  value={categoryForm.icon}
                  onChange={(event) =>
                    setCategoryForm((prev) => ({ ...prev, icon: event.target.value }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                  placeholder="Atom"
                />
              </label>

              <label className="block text-sm text-white/75">
                Difficulty
                <select
                  value={categoryForm.difficulty}
                  onChange={(event) =>
                    setCategoryForm((prev) => ({
                      ...prev,
                      difficulty: event.target.value as Difficulty,
                    }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </label>

              <label className="block text-sm text-white/75">
                Category image URL
                <input
                  value={categoryForm.categoryImageUrl}
                  onChange={(event) =>
                    setCategoryForm((prev) => ({ ...prev, categoryImageUrl: event.target.value }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                  placeholder="https://..."
                />
              </label>

              <label className="flex items-center gap-3 text-sm text-white/75">
                <input
                  type="checkbox"
                  checked={categoryForm.isAfterDark}
                  onChange={(event) =>
                    setCategoryForm((prev) => ({ ...prev, isAfterDark: event.target.checked }))
                  }
                />
                Mark this as After Dark (18+)
              </label>

              {categoryMessage && <p className="text-sm text-emerald-300">{categoryMessage}</p>}
              {submitCategoryMutation.error instanceof Error && (
                <p className="text-sm text-rose-300">{submitCategoryMutation.error.message}</p>
              )}

              <button
                type="submit"
                disabled={submitCategoryMutation.isPending}
                className="glass-action-primary rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitCategoryMutation.isPending ? "Submitting..." : "Submit category"}
              </button>
            </form>
          </section>

          <section className="glass-panel rounded-2xl p-6">
            <h2 className="font-display text-2xl font-bold text-white">New question</h2>
            <p className="mt-2 text-sm text-white/65">
              Submit to an approved category or one of your own pending categories.
            </p>

            <form
              className="mt-5 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                setQuestionMessage(null);
                submitQuestionMutation.mutate({
                  categoryId: questionForm.categoryId,
                  pointValue: questionForm.pointValue,
                  text: questionForm.text,
                  answer: questionForm.answer,
                  acceptedAnswers: questionForm.acceptedAnswers
                    .split(",")
                    .map((answer) => answer.trim())
                    .filter(Boolean),
                  imageUrl: questionForm.imageUrl,
                  funFact: questionForm.funFact,
                });
              }}
            >
              <label className="block text-sm text-white/75">
                Category
                <select
                  required
                  value={questionForm.categoryId}
                  onChange={(event) =>
                    setQuestionForm((prev) => ({ ...prev, categoryId: event.target.value }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                >
                  <option value="">Select a category</option>
                  {questionCategoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm text-white/75">
                Point tier
                <select
                  value={questionForm.pointValue}
                  onChange={(event) =>
                    setQuestionForm((prev) => ({
                      ...prev,
                      pointValue: Number(event.target.value) as (typeof POINTS)[number],
                    }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                >
                  {POINTS.map((points) => (
                    <option key={points} value={points}>
                      {points}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block text-sm text-white/75">
                Question text
                <textarea
                  required
                  rows={4}
                  value={questionForm.text}
                  onChange={(event) =>
                    setQuestionForm((prev) => ({ ...prev, text: event.target.value }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                  placeholder="What planet is known as the Red Planet?"
                />
              </label>

              <label className="block text-sm text-white/75">
                Answer
                <input
                  required
                  value={questionForm.answer}
                  onChange={(event) =>
                    setQuestionForm((prev) => ({ ...prev, answer: event.target.value }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                  placeholder="Mars"
                />
              </label>

              <label className="block text-sm text-white/75">
                Accepted answers (comma-separated)
                <input
                  value={questionForm.acceptedAnswers}
                  onChange={(event) =>
                    setQuestionForm((prev) => ({ ...prev, acceptedAnswers: event.target.value }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                  placeholder="The Red Planet, Planet Mars"
                />
              </label>

              <label className="block text-sm text-white/75">
                Image URL
                <input
                  value={questionForm.imageUrl}
                  onChange={(event) =>
                    setQuestionForm((prev) => ({ ...prev, imageUrl: event.target.value }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                  placeholder="https://..."
                />
              </label>

              <label className="block text-sm text-white/75">
                Fun fact
                <textarea
                  rows={3}
                  value={questionForm.funFact}
                  onChange={(event) =>
                    setQuestionForm((prev) => ({ ...prev, funFact: event.target.value }))
                  }
                  className="glass-panel mt-1.5 w-full rounded-xl px-3 py-2.5 text-white"
                  placeholder="Optional extra context for the reveal screen"
                />
              </label>

              {questionMessage && <p className="text-sm text-emerald-300">{questionMessage}</p>}
              {submitQuestionMutation.error instanceof Error && (
                <p className="text-sm text-rose-300">{submitQuestionMutation.error.message}</p>
              )}

              <button
                type="submit"
                disabled={submitQuestionMutation.isPending || questionCategoryOptions.length === 0}
                className="glass-action-primary rounded-xl px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitQuestionMutation.isPending ? "Submitting..." : "Submit question"}
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Contribute;
