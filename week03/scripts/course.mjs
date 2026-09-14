const byuiCourse = {
  code: "WDD231",
  name: "Web Frontend Development I",
  sections: [
    // Keep all of the original section objects here.
  ],

  changeEnrollment: function (sectionNum, add = true) {
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum == sectionNum
    );

    if (sectionIndex >= 0) {
      if (add) {
        this.sections[sectionIndex].enrolled++;
      } else {
        this.sections[sectionIndex].enrolled--;
      }
    }
  }
};

export default byuiCourse;