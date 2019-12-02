const util = require("util");
const Riak = require("basho-riak-client");

const Client = util.promisify(Riak.Client);

const bucket = "s19142";

const document = {
  id: 10,
  title: "Document 10",
  subtitle: "doc 10",
  description: "This is a document 10 in Riak db",
  isFake: false
};

const main = async () => {
  const client = await new Client(["127.0.0.1:8087"]);

  // fails to promisify API
  // const fetchValue = util.promisify(client.fetchValue, {context: client});

  client.storeValue(
    {
      bucket,
      key: document.id.toString(),
      value: document
    },
    function(err) {
      if (err) {
        throw new Error(err);
      } else {
        console.log("Success: saved");
        client.fetchValue({ bucket, key: document.id.toString() }, function(
          err,
          rslt1
        ) {
          if (err) {
            throw new Error(err);
          } else {
            const riakObj1 = rslt1.values.shift();
            const result1 = JSON.parse(riakObj1.value.toString());
            console.log("Success: retrieved");
            console.log(result1);
            result1.isFake = true;

            client.storeValue(
              {
                bucket,
                key: result1.id.toString(),
                value: result1
              },
              function(err) {
                if (err) {
                  throw new Error(err);
                } else {
                  console.log("Success: updated");
                  client.fetchValue(
                    { bucket, key: result1.id.toString() },
                    function(err, rslt2) {
                      if (err) {
                        throw new Error(err);
                      } else {
                        const riakObj2 = rslt2.values.shift();
                        const result2 = JSON.parse(riakObj2.value.toString());
                        console.log("Success: retrieved");
                        console.log(result2);

                        client.deleteValue(
                          { bucket, key: result2.id.toString() },
                          function(err, rslt) {
                            if (err) {
                              throw new Error(err);
                            } else {
                              console.log("Success: deleted");

                              client.fetchValue(
                                { bucket, key: result2.id.toString() },
                                function(err, rslt3) {
                                  if (err) {
                                    console.log("Success: value is missing");
                                  } else {
                                    // const riakObj3 = rslt3.values.shift();
                                    // const result3 = JSON.parse(
                                    //   riakObj3.value.toString()
                                    // );
                                    // console.log("Success: retrieved");
                                    console.log(rslt3);
                                    console.log("Success: value is missing");
                                  }
                                }
                              );
                            }
                          }
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        });
      }
    }
  );
};

main();
