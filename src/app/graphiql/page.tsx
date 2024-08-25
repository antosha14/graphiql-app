import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';

export default function GraphiqlPage() {
  return (
    <ProtectedRoute>
      <div>Graphiql page</div>
    </ProtectedRoute>
  );
}
