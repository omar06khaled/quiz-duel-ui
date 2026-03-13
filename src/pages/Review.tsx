import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthCard } from "@/components/auth/AuthCard";
import { useSupabaseAuth } from "@/hooks/use-supabase-auth";
import {
  getMyProfile,
  listPendingCategoriesForReview,
  listPendingQuestionsForReview,
  reviewCategorySubmission,
  reviewQuestionSubmission,
  signOut,
} from "@/lib/community";
import { hasSupabaseConfig } from "@/lib/supabase";

const Review = () => {
  const queryClient = useQueryClient();
  const { user, isLoading: authLoading } = useSupabaseAuth();
  const [categoryNotes, setCategoryNotes] = useState<Record<string, string>>({});
  const [questionNotes, setQuestionNotes] = useState<Record<string, string>>({});

  const profileQuery = useQuery({
    queryKey: ["my-profile", user?.id],
    queryFn: getMyProfile,
    enabled: Boolean(user),
    retry: false,
  });

  const isReviewer = useMemo(() => {
    return profileQuery.data?.role === "reviewer" || profileQuery.data?.role === "admin";
  }, [profileQuery.data]);

  const pendingCategoriesQuery = useQuery({
    queryKey: ["pending-categories"],
    queryFn: listPendingCategoriesForReview,
    enabled: Boolean(user) && isReviewer,
    retry: false,
  });

  const pendingQuestionsQuery = useQuery({
    queryKey: ["pending-questions"],
    queryFn: listPendingQuestionsForReview,
    enabled: Boolean(user) && isReviewer,
    retry: false,
  });

  const signOutMutation = useMutation({ mutationFn: signOut });

  const categoryDecisionMutation = useMutation({
    mutationFn: ({ id, decision, notes }: { id: string; decision: "approved" | "rejected"; notes: string }) =>
      reviewCategorySubmission(id, decision, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-categories"] });
      queryClient.invalidateQueries({ queryKey: ["submission-categories"] });
      queryClient.invalidateQueries({ queryKey: ["approved-category-library"] });
    },
  });

  const questionDecisionMutation = useMutation({
    mutationFn: ({ id, decision, notes }: { id: string; decision: "approved" | "rejected"; notes: string }) =>
      reviewQuestionSubmission(id, decision, notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pending-questions"] });
      queryClient.invalidateQueries({ queryKey: ["approved-category-library"] });
    },
  });

  if (!hasSupabaseConfig) {
    return (
      <div className="glass-page-bg flex min-h-[100dvh] items-center justify-center px-4 py-8">
        <div className="glass-panel max-w-xl rounded-2xl p-6 text-center text-white">
          <h1 className="font-display text-3xl font-bold">Supabase config missing</h1>
          <p className="mt-3 text-white/70">
            Add your browser Supabase environment variables before using the review dashboard.
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
            title="Review pending submissions"
            description="Reviewer and admin accounts can approve or reject community content here."
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

  if (!isReviewer) {
    return (
      <div className="glass-page-bg flex min-h-[100dvh] items-center justify-center px-4 py-8">
        <div className="glass-panel max-w-xl rounded-2xl p-6 text-center text-white">
          <h1 className="font-display text-3xl font-bold">Reviewer access required</h1>
          <p className="mt-3 text-white/70">
            Your account is signed in as {profileQuery.data?.role ?? "player"}. Promote it to `reviewer` or `admin` in Supabase to use this dashboard.
          </p>
          <div className="mt-5 flex justify-center gap-3">
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
      </div>
    );
  }

  return (
    <div className="glass-page-bg min-h-[100dvh] px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-white/45">Moderator tools</p>
            <h1 className="font-display text-4xl font-bold text-white">Review queue</h1>
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
            <h2 className="font-display text-2xl font-bold text-white">Pending categories</h2>
            <div className="mt-5 space-y-4">
              {(pendingCategoriesQuery.data ?? []).length === 0 ? (
                <p className="text-sm text-white/60">No category submissions are waiting for review.</p>
              ) : (
                pendingCategoriesQuery.data?.map((category) => (
                  <article key={category.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-display text-xl font-bold text-white">{category.name}</h3>
                        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/45">
                          {category.difficulty} • {category.icon} • {category.isAfterDark ? "After Dark" : "Standard"}
                        </p>
                      </div>
                      {category.categoryImageUrl && (
                        <img
                          src={category.categoryImageUrl}
                          alt={category.name}
                          className="h-16 w-24 rounded-lg object-cover"
                        />
                      )}
                    </div>

                    <textarea
                      rows={3}
                      value={categoryNotes[category.id] ?? category.reviewNotes ?? ""}
                      onChange={(event) =>
                        setCategoryNotes((prev) => ({ ...prev, [category.id]: event.target.value }))
                      }
                      className="glass-panel mt-4 w-full rounded-xl px-3 py-2.5 text-white"
                      placeholder="Optional review notes"
                    />

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() =>
                          categoryDecisionMutation.mutate({
                            id: category.id,
                            decision: "approved",
                            notes: categoryNotes[category.id] ?? "",
                          })
                        }
                        className="glass-action-primary rounded-xl px-4 py-2 text-sm font-semibold text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          categoryDecisionMutation.mutate({
                            id: category.id,
                            decision: "rejected",
                            notes: categoryNotes[category.id] ?? "",
                          })
                        }
                        className="glass-action rounded-xl px-4 py-2 text-sm font-semibold text-white/80"
                      >
                        Reject
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>

          <section className="glass-panel rounded-2xl p-6">
            <h2 className="font-display text-2xl font-bold text-white">Pending questions</h2>
            <div className="mt-5 space-y-4">
              {(pendingQuestionsQuery.data ?? []).length === 0 ? (
                <p className="text-sm text-white/60">No question submissions are waiting for review.</p>
              ) : (
                pendingQuestionsQuery.data?.map((question) => (
                  <article key={question.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                      {question.categoryName} • {question.pointValue} points
                    </p>
                    <p className="mt-3 text-base font-semibold text-white">{question.text}</p>
                    <p className="mt-2 text-sm text-white/75">
                      Answer: <span className="font-semibold text-white">{question.answer}</span>
                    </p>
                    {question.acceptedAnswers && question.acceptedAnswers.length > 0 && (
                      <p className="mt-2 text-sm text-white/60">
                        Accepted answers: {question.acceptedAnswers.join(", ")}
                      </p>
                    )}
                    {question.funFact && (
                      <p className="mt-2 text-sm italic text-white/60">{question.funFact}</p>
                    )}

                    <textarea
                      rows={3}
                      value={questionNotes[question.id] ?? question.reviewNotes ?? ""}
                      onChange={(event) =>
                        setQuestionNotes((prev) => ({ ...prev, [question.id]: event.target.value }))
                      }
                      className="glass-panel mt-4 w-full rounded-xl px-3 py-2.5 text-white"
                      placeholder="Optional review notes"
                    />

                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() =>
                          questionDecisionMutation.mutate({
                            id: question.id,
                            decision: "approved",
                            notes: questionNotes[question.id] ?? "",
                          })
                        }
                        className="glass-action-primary rounded-xl px-4 py-2 text-sm font-semibold text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() =>
                          questionDecisionMutation.mutate({
                            id: question.id,
                            decision: "rejected",
                            notes: questionNotes[question.id] ?? "",
                          })
                        }
                        className="glass-action rounded-xl px-4 py-2 text-sm font-semibold text-white/80"
                      >
                        Reject
                      </button>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Review;
