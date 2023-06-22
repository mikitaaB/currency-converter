"use client";

import React, { Component } from "react";

interface ErrorBoundaryProps {
	children: React.ReactNode;
}

interface ErrorBoundaryState {
	hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: any) {
		// Обновляем состояние, чтобы отобразить сообщение об ошибке
		return { hasError: true };
	}

	componentDidCatch(error: any, errorInfo: any) {
		// Логируем ошибку в консоли
		console.error("Error caught by error boundary:", error, errorInfo);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h2>Oops, there is an error!</h2>
					<button
						type="button"
						onClick={() => this.setState({ hasError: false })}
					>
						Try again?
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
