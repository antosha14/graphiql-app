'use client';

import HistorySection from '@components/HistorySection/HistorySection';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <HistorySection></HistorySection>
    </ProtectedRoute>
  );
}
