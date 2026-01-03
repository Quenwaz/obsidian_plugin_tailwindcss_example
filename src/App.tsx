import { StrictMode } from 'react';
import { ItemView, WorkspaceLeaf } from 'obsidian';
import { Root, createRoot } from 'react-dom/client';
import { ReactView } from './ReactView';
import { AppContext } from './context'
import './styles.css';

const VIEW_TYPE_EXAMPLE = 'example-view';

export class ExampleView extends ItemView {
	root: Root | null = null;

	constructor(leaf: WorkspaceLeaf) {
		super(leaf);
	}

	getViewType() {
		return VIEW_TYPE_EXAMPLE;
	}

	getDisplayText() {
		return 'Example view';
	}

	async onOpen() {
		this.contentEl.addClass('zkh');
		this.root = createRoot(this.contentEl);
		this.root.render(
			<AppContext.Provider value={this.app}>
				<ReactView />
			</AppContext.Provider>
		);
	}

	async onClose() {
		this.root?.unmount();
	}
}