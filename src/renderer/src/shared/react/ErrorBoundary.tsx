import React from "react";

type ErrorBoundaryProps = {
    children: React.ReactNode;
}

type ErrorBoundaryState = {
    error: Error | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <div>
                    <h2>
                        Something went wrong.
                        (Мама, мы упали)
                    </h2>
                    <details style={{ whiteSpace: "pre-wrap" }}>
                        {this.state.error && this.state.error.toString()}
                        <br />
                        {this.state.error && this.state.error.stack}
                    </details>
                </div>
            );
        }

        return this.props.children;
    }
}
