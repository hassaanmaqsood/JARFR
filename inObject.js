export const inObject = (obj, searchString) => {
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
