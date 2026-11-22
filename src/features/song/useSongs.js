import { useEffect } from 'react';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { getSongBook } from '../../services/apiSongBook';

export function useSongs({ page = 1, limit = 10, search, category = '' } = {}) {
  const queryClient = useQueryClient();

  // Use React Query to fetch songs with pagination and search
  const { isPending, isFetching, isPlaceholderData, data, error } = useQuery({
    queryKey: ['song-book', page, limit, search, category],
    queryFn: () => getSongBook({ page, limit, search, category }),
    // Keep showing the current page while the next one loads
    placeholderData: keepPreviousData,
    onError: (err) => toast.error(err.message),
  });

  // Prefetch the next page so "Next" feels instant
  const totalPages = data?.totalPages;
  useEffect(() => {
    if (isPlaceholderData || !totalPages || page >= totalPages) return;
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ['song-book', nextPage, limit, search, category],
      queryFn: () => getSongBook({ page: nextPage, limit, search, category }),
    });
  }, [
    queryClient,
    isPlaceholderData,
    totalPages,
    page,
    limit,
    search,
    category,
  ]);

  return { isPending, isFetching, isPlaceholderData, data, error };
}

// Same list, loaded a page at a time and appended ("Load more").
export function useInfiniteSongs({
  limit = 10,
  search = '',
  category = '',
} = {}) {
  const {
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    data,
    error,
  } = useInfiniteQuery({
    queryKey: ['song-book-infinite', limit, search, category],
    queryFn: ({ pageParam }) =>
      getSongBook({ page: pageParam, limit, search, category }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const current = Number(lastPage.currentPage);
      return current < lastPage.totalPages ? current + 1 : undefined;
    },
    placeholderData: keepPreviousData,
  });

  const songs = data?.pages.flatMap((p) => p.data) ?? [];
  const totalItems = data?.pages[0]?.totalDocuments ?? 0;

  return {
    isPending,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    songs,
    totalItems,
    error,
  };
}
