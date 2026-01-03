import { App, Plugin, PluginSettingTab, Setting, ItemView, WorkspaceLeaf, Notice, MarkdownRenderer } from 'obsidian';
import initSqlJs from 'sql.js';
import {ExampleView} from './App'

// Define the view type for our custom QA view
const QA_VIEW_TYPE = 'goal-view';

// Interface for QA entry
interface QAEntry {
    id?: number;
    question: string;
    answer: string;
    tags?: string[];
}

// Interface for Tag
interface Tag {
    id?: number;
    name: string;
}

// Plugin class
export default class QAPlugin extends Plugin {
    db: any | null = null; // sql.js Database type
    SQL: any | null = null; // sql.js instance
    dbFilePath: string = '';

    async onload() {
        console.log('Loading  Plugin');

        // Initialize sql.js and database
        // await this.initDatabase();

        // Register the custom view
        this.registerView(QA_VIEW_TYPE, (leaf) => new ExampleView(leaf));

        // Add a ribbon icon to open the QA view
        this.addRibbonIcon('dice', 'Open  View', () => {
            this.activateView();
        });

        // Add a command to open the QA view
        this.addCommand({
            id: 'open-qa-view',
            name: 'Open View',
            callback: () => {
                this.activateView();
            },
        });

        // Settings tab (optional, for future extensions)
        this.addSettingTab(new QASettingTab(this.app, this));
    }

    async onunload() {
        console.log('Unloading QA Plugin');
        if (this.db) {
            this.db.close();
        }
    }

    

    // Activate the QA view in a new leaf (tab)
    async activateView() {
        const leaves = this.app.workspace.getLeavesOfType(QA_VIEW_TYPE);
        if (leaves.length > 0) {
            this.app.workspace.revealLeaf(leaves[0]);
        } else {
            const leaf = this.app.workspace.getLeaf(true); // Create a new tab
            await leaf.setViewState({ type: QA_VIEW_TYPE, active: true });
            this.app.workspace.revealLeaf(leaf);
        }
    }

}


// Settings tab (placeholder for future settings)
class QASettingTab extends PluginSettingTab {
    plugin: QAPlugin;

    constructor(app: App, plugin: QAPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;
        containerEl.empty();
        containerEl.createEl('h2', { text: ' Plugin Settings' });

        new Setting(containerEl)
            .setName('Example Setting')
            .setDesc('This is a placeholder setting.')
            .addText((text) => text.setPlaceholder('Enter something'));
    }
}