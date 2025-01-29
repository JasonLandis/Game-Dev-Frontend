import './Error.scss';

export default function Error({ error }: { error: { message: string; status: number } }) {
  return (
    <>
      <div className='error-container'>
        <div className="error-title">An API error occured</div>
        <div className="error-properties">
          <div>
            <strong>Message:</strong> {error.message}
          </div>
          <div>
            <strong>Status:</strong> {error.status}
          </div>
        </div>
      </div>
    </>
  );
}
