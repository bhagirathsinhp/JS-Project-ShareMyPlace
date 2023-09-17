// For displaying modal and rendering content.

export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }

  show() {
    if ("content" in document.createElement("template")) {
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      this.modalEl = modalElements.querySelector(".modal");
      this.backdropEl = modalElements.querySelector(".backdrop");
      const contentEl = document.importNode(
        this.contentTemplateEl.content,
        true
      );

      this.modalEl.appendChild(contentEl);

      document.body.insertAdjacentElement("afterbegin", this.modalEl);
      document.body.insertAdjacentElement("afterbegin", this.backdropEl);
    } else {
      // Fallback Code instead of showing overlay...
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalEl) {
      this.modalEl.remove(); // document.body.removeChild(this.modalEl)
      this.backdropEl.remove(); // document.body.removeChild(this.backdropEl)

      this.modalEl = null;
      this.backdropEl = null;
    }
  }
}
