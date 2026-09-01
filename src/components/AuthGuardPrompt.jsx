import { useAuth } from '../context/AuthContext'

function AuthGuardPrompt() {
  const { isPromptOpen, promptMessage, closePrompt, promptToLogin } = useAuth()

  if (!isPromptOpen) return null

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" onClick={closePrompt}>
        <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content rounded-4 text-center">
            <div className="modal-body p-4">
              <div className="fs-1 mb-2">🔒</div>
              <h3 className="font-display fs-4">Login Required</h3>
              <p className="text-secondary small mb-4">{promptMessage}</p>

              <div className="d-flex gap-2">
                <button type="button" className="btn btn-secondary flex-fill" onClick={closePrompt}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary flex-fill" onClick={promptToLogin}>
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  )
}

export default AuthGuardPrompt
