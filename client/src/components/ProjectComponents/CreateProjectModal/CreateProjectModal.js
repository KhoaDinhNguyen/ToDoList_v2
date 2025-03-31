import "./CreateProjectModal.css";

function CreateProjectModal(props) {
  const { message, onClickCloseDialog } = props;

  if (message === "Create project successfully") {
    return (
      <div
        id="dialog"
        className={`${
          message === "" ? "notVisibleDialog" : "visibleDialog"
        } errorDialog`}
      >
        <div
          id="createProjectDialog"
          className={
            message === ""
              ? "notVisibleCreateProjectDialog"
              : "visibleCreateProjectDialog"
          }
        >
          <p id="symbol" className="successSymbol">
            <span>&#10003;</span>
          </p>
          <p className="message">{message}</p>
          <button onClick={onClickCloseDialog} id="buttonCloseDialog">
            <span>Close</span>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div
        id="dialog"
        className={`${
          message === "" ? "notVisibleDialog" : "visibleDialog"
        } errorDialog`}
      >
        <div
          id="createProjectDialog"
          className={
            message === ""
              ? "notVisibleCreateProjectDialog"
              : "visibleCreateProjectDialog"
          }
        >
          <p id="symbol" className="errorSymbol">
            <span>&#10007;</span>
          </p>
          <div className="message">
            <p>Cannot create new project</p>
            <p>{message}</p>
          </div>
          <button onClick={onClickCloseDialog} id="buttonCloseDialog">
            <span>Close</span>
          </button>
        </div>
      </div>
    );
  }
}

export default CreateProjectModal;
