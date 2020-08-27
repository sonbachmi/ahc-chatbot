import React, {useEffect, useState} from 'react';

/* Compoment to render a modal dialog */

export default function Modal({title, submitLabel, showing, onClose, onSubmit, children}) {
    const [show, setShow] = useState(showing);

    useEffect(() => {
        setShow(showing);
    }, [showing]);

    function close() {
        setShow(false);
        if (onClose) onClose();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (onSubmit) {
            // If submit handler returns true, do not close modal
            const keepOpen = await onSubmit(e.target);
            if (keepOpen) return;
        }
        close();
    }

    if (!show) return null;

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div className="modal is-active">
                <div className="modal-background"/>
                <div className="modal-card" style={{ overflow: 'visible' }}>
                    <header className="modal-card-head">
                        <p className="modal-card-title">{title}</p>
                        <button type="button" className="delete" aria-label="close" onClick={close}/>
                    </header>
                    <section className="modal-card-body">
                        {children}
                    </section>
                    <footer className="modal-card-foot">
                        <button type="submit" className="button is-primary">{submitLabel || 'OK'}</button>
                        <button type="button" className="button" onClick={close}>Cancel</button>
                    </footer>
                </div>
            </div>
        </form>
    )
}
