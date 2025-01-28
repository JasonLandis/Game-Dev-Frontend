import './Error.scss';

export default function Error({ error }: { error: { message: string; status: number } }) {
  return (
    <>
      <div className="error-title">An API error occured</div>
      <div className="error-property">
        <strong>Message:</strong> {error.message}
      </div>
      <div className="error-property">
        <strong>Status:</strong> {error.status}
      </div>
    </>
  );
}
