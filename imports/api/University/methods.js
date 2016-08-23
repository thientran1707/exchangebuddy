import University from '.';

if (Meteor.isServer) {

  Meteor.methods({

    'University.getAll'() {
      return University.findAll().then(function(universities) {
        return universities.map(uni => uni.get());
      });
    },

    'University.get'(id) {
      check(id, Number);

      return University.findOne({ where: { id } }).then(function(result) {
        return result && result.get();
      });
    },

    'University.getByName'(name) {
      check(name, String);

      return University.findOne({ where: { name } }).then(function(result) {
        return result && result.get();
      });
    },

  });

  export const bulkCreateOrUpdate = (unis) => {
    if (!unis)
      return;

    unis.forEach(uni => {
      University.upsert(uni);
    });
  };

}
