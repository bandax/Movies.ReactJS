import * as React from "react"
import "./Modal.scss"
import { time } from "console"
import { title } from "process"

interface IModalProps {
    title: string
    submitTitle: string
    cancelTitle: string
    children: React.ReactNode
    onClose: () => void
}

class Modal extends React.Component<IModalProps, {}> {
    constructor(props: IModalProps) {
        super(props)
    }

    render() {
        const { title, submitTitle, cancelTitle, children } = this.props
        return (
            <div className="overlay">
                <div className="modal">
                    <h2>{title}</h2>
                    <a className="close" href="#">
                        &times;
                    </a>
                    <div className="content">{children}</div>
                    <div className="actions">
                        <button
                            className="toggle-button"
                            onClick={this.props.onClose}
                        >
                            {}
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export { Modal }
