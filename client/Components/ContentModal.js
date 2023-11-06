import React, { useState } from "react";

const ContentModal = (props) => {

	return (
		<div>
<div className="modalBackground">
        <main className="new-list-modal">
          <div id="close-modal">
            <button className="modalX" onClick={() => props.openErrorModal(false)}>
              X
            </button>
          </div>
          <section className="modal-content">
            <p>{props.content}</p>
          </section>
        </main>
      </div>
		</div>
	)
}

export default ContentModal
