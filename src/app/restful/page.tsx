import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';

export default function RestfullPage() {
  return (
    <ProtectedRoute>
      <div>Restfull page</div>
    </ProtectedRoute>
  );
}
