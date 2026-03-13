import { describe, expect, it } from "vitest";
import {
  POINTS,
  buildPlayableCategoryLibrary,
  type CategoryRecord,
  type QuestionRecord,
} from "@/lib/content";

describe("content mapping", () => {
  it("defines the expected point tiers", () => {
    expect(POINTS).toEqual([200, 400, 600]);
  });

  it("builds playable categories from approved rows", () => {
    const categories: CategoryRecord[] = [
      {
        id: "cat-1",
        slug: "science",
        name: "Science",
        icon: "Atom",
        difficulty: "medium",
        is_after_dark: false,
        category_image_url: null,
        created_at: "2026-03-01T00:00:00.000Z",
      },
    ];

    const questions: QuestionRecord[] = [
      {
        id: "q-200",
        category_id: "cat-1",
        point_value: 200,
        text: "Question 200",
        answer: "Answer 200",
        accepted_answers: null,
        image_url: null,
        fun_fact: null,
        created_at: "2026-03-01T00:00:00.000Z",
      },
      {
        id: "q-400",
        category_id: "cat-1",
        point_value: 400,
        text: "Question 400",
        answer: "Answer 400",
        accepted_answers: ["Alt 400"],
        image_url: "https://example.com/q-400.png",
        fun_fact: "Fun fact",
        created_at: "2026-03-01T00:00:00.000Z",
      },
      {
        id: "q-600",
        category_id: "cat-1",
        point_value: 600,
        text: "Question 600",
        answer: "Answer 600",
        accepted_answers: null,
        image_url: null,
        fun_fact: null,
        created_at: "2026-03-01T00:00:00.000Z",
      },
    ];

    const playableCategories = buildPlayableCategoryLibrary(categories, questions);

    expect(playableCategories).toHaveLength(1);
    expect(playableCategories[0]?.questions[200]).toHaveLength(1);
    expect(playableCategories[0]?.questions[400][0]?.acceptedAnswers).toEqual(["Alt 400"]);
  });

  it("filters out categories that are missing a point tier", () => {
    const categories: CategoryRecord[] = [
      {
        id: "cat-2",
        slug: "history",
        name: "History",
        icon: "Landmark",
        difficulty: "easy",
        is_after_dark: false,
        category_image_url: null,
        created_at: "2026-03-01T00:00:00.000Z",
      },
    ];

    const questions: QuestionRecord[] = [
      {
        id: "q-a",
        category_id: "cat-2",
        point_value: 200,
        text: "Question A",
        answer: "Answer A",
        accepted_answers: null,
        image_url: null,
        fun_fact: null,
        created_at: "2026-03-01T00:00:00.000Z",
      },
      {
        id: "q-b",
        category_id: "cat-2",
        point_value: 400,
        text: "Question B",
        answer: "Answer B",
        accepted_answers: null,
        image_url: null,
        fun_fact: null,
        created_at: "2026-03-01T00:00:00.000Z",
      },
    ];

    expect(buildPlayableCategoryLibrary(categories, questions)).toEqual([]);
  });
});
