import { ViewModel } from "@view-models/core";

type EditingState = {
  title: string;
};

const emptyState = { title: "" };

export class TodoCreationModel extends ViewModel<EditingState> {
  constructor() {
    super(emptyState);
  }

  updateTitle(title: string) {
    this.update({ title });
  }

  reset() {
    this.update(emptyState);
  }
}
