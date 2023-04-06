export const filterNestedObjects = (obj, searchString) => {
      for (const prop in obj) {
        if (typeof obj[prop] === "object") {
          const result = filterNestedObjects(obj[prop], searchString);
          if (result) {
            return true;
          }
        } else if (obj[prop].includes(searchString)) {
          return true;
        }
      }
      return false;
    };

    return this.medicalRecord.filter((obj) => {
      return filterNestedObjects(obj, searchString);
    });
  };
