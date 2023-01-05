"use client";
import { Component, ReactNode, PropsWithChildren } from "react";

export class ErrorBoundary extends Component<
    PropsWithChildren<{ fallback: ReactNode }>,
    { hasError: boolean }
> {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return this.props.fallback;
        }

        return this.props.children;
    }
}
