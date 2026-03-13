import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HomeScreen } from "./HomeScreen";
import * as authHook from "@/hooks/use-supabase-auth";
import * as community from "@/lib/community";
import * as content from "@/lib/content";

vi.mock("@/hooks/use-supabase-auth", () => ({
  useSupabaseAuth: vi.fn(),
}));

vi.mock("@/lib/community", async () => {
  const actual = await vi.importActual<typeof import("@/lib/community")>("@/lib/community");
  return {
    ...actual,
    getMyProfile: vi.fn(),
  };
});

vi.mock("@/lib/content", async () => {
  const actual = await vi.importActual<typeof import("@/lib/content")>("@/lib/content");
  return {
    ...actual,
    fetchApprovedCategoryLibrary: vi.fn(),
  };
});

const useSupabaseAuthMock = vi.mocked(authHook.useSupabaseAuth);
const getMyProfileMock = vi.mocked(community.getMyProfile);
const fetchApprovedCategoryLibraryMock = vi.mocked(content.fetchApprovedCategoryLibrary);

const renderHomeScreen = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <HomeScreen onStartGame={() => undefined} />
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("HomeScreen review queue visibility", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    fetchApprovedCategoryLibraryMock.mockResolvedValue([]);
  });

  afterEach(() => {
    cleanup();
  });

  it("hides the review queue button for signed-out users", async () => {
    useSupabaseAuthMock.mockReturnValue({ session: null, user: null, isLoading: false });

    renderHomeScreen();

    await waitFor(() => {
      expect(fetchApprovedCategoryLibraryMock).toHaveBeenCalled();
    });
    expect(getMyProfileMock).not.toHaveBeenCalled();
    expect(screen.queryByRole("link", { name: /review queue/i })).not.toBeInTheDocument();
  });

  it("hides the review queue button for players", async () => {
    useSupabaseAuthMock.mockReturnValue({
      session: null,
      user: { id: "user-1", email: "player@example.com" } as any,
      isLoading: false,
    });
    getMyProfileMock.mockResolvedValue({ id: "user-1", display_name: "Player", role: "player" });

    renderHomeScreen();

    await waitFor(() => {
      expect(getMyProfileMock).toHaveBeenCalled();
    });
    expect(screen.queryByRole("link", { name: /review queue/i })).not.toBeInTheDocument();
  });

  it("shows the review queue button for reviewers", async () => {
    useSupabaseAuthMock.mockReturnValue({
      session: null,
      user: { id: "user-2", email: "reviewer@example.com" } as any,
      isLoading: false,
    });
    getMyProfileMock.mockResolvedValue({ id: "user-2", display_name: "Reviewer", role: "reviewer" });

    renderHomeScreen();

    expect(await screen.findByRole("link", { name: /review queue/i })).toBeInTheDocument();
  });

  it("shows the review queue button for admins", async () => {
    useSupabaseAuthMock.mockReturnValue({
      session: null,
      user: { id: "user-3", email: "admin@example.com" } as any,
      isLoading: false,
    });
    getMyProfileMock.mockResolvedValue({ id: "user-3", display_name: "Admin", role: "admin" });

    renderHomeScreen();

    expect(await screen.findByRole("link", { name: /review queue/i })).toBeInTheDocument();
  });
});
