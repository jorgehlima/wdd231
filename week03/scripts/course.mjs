const byuiCourse = {
  code: "WDD231",
  name: "Web Frontend Development I",
  sections: [

  ],

  changeEnrollment: function (sectionNum, add = true) {
    const section = this.sections.find(
      (section) => section.sectionNum == sectionNum
    );

    if (section && add) {
      section.enrolled++;
    } else if (section && !add) {
      section.enrolled--;
    }
  }
};

export default byuiCourse;