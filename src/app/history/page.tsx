import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';

export default function HistoryPage() {
  return (
    <ProtectedRoute>
      <div>History page</div>
    </ProtectedRoute>
  );
}
