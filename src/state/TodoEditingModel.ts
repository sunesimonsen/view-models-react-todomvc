import { ViewModel } from "@view-models/core";

type EditingState = {
  title: string;
  editingId: string | null;
};

const emptyState = { editingId: null, title: "" };

export class TodoEditingModel extends ViewModel<EditingState> {
  constructor() {
    super(emptyState);
  }

  start(editingId: string, title: string) {
    this.update({ editingId, title });
  }

  updateTitle(title: string) {
    this.update({ title });
  }

  reset() {
    this.update(emptyState);
  }
}
