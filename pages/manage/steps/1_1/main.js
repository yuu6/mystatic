var driver = neo4j.v1.driver("bolt://127.0.0.1:7687", neo4j.v1.auth.basic("neo4j", "root"));
var session = driver.session();
var cypher_str = "MATCH (n) RETURN DISTINCT LABELS(n) as label, COUNT(n) as count";

function print_str(record) {
    return "  <tr>\n" +
        "            <td scope=\"row\">" + record.get('label') + "</td>\n" +
        "            <td>" + record.get('count') + "</td>\n" +
        "        </tr>\n";
}

getData(cypher_str, print_str);

function getData(cypher_str, print_str) {
    session
    // .run('MERGE (alice:Person {name : {nameParam} }) RETURN alice.name AS name', {nameParam: 'Alice'})
        .run(cypher_str)
        // .run("match(p1:PERSON) return p1.name as name;")
        .subscribe({
            onNext: function (record) {
                console.log(record.get('label'));
                $("#dataArea").append(print_str(record))
            },
            onCompleted: function () {
                session.close();
            },
            onError: function (error) {
                console.log(error);
            }
        });
}