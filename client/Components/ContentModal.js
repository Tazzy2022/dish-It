import React from "react";

const ContentModal = (props) => {

	return (
        <main className="error-modal">
          <div id="close-modal">
            <button className="closeX" onClick={() => props.openErrorModal(false)}>
              X
            </button>
          </div>
          <section>
            <p className="modal-content">{props.content}</p>
          </section>
        </main>
	)
}

export default ContentModal
