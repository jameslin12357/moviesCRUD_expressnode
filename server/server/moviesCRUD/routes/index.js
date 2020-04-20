var express = require('express');
var router = express.Router();
const oracledb = require('oracledb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/moviespag', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select * from movie m order by m.NAME ) T) WHERE RN > ${start} AND RN <= ${end}`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM movie p`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            } );
          

            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    run();
});


router.get('/countries', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select distinct p.COUNTRY from product p order by p.COUNTRY ) T)`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM product p`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    run();
});


router.get('/directors', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select distinct m.DIRECTOR from movie m order by m.DIRECTOR ) T)`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM movie m`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    run();
});


router.get('/genres', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select distinct m.GENRE from movie m order by m.GENRE ) T)`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM movie m`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    run();
});


router.get('/years', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select distinct m.YEAR from movie m order by m.YEAR ) T)`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM movie m`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    run();
});

router.get('/ratings', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            const result = await connection.execute(
                `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select distinct m.RATING from movie m order by m.RATING ) T)`
            );
            const result2 = await connection.execute(
                `SELECT COUNT(*) AS TOTAL FROM movie m`
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    run();
});


router.get('/filtermovies', function (req, res, next) {
    var page = req.query.page;
    var limit = req.query.limit;
    var pageInt = Number(page);
    var rowsInt = Number(limit);
    var start = (pageInt * rowsInt) - rowsInt;
    var end = pageInt * rowsInt;
    var movielow = req.query.ml;
    var moviehigh = req.query.mh;
    var country = req.query.country;
    var director = req.query.director;
    var genre = req.query.genre;
    var rating = req.query.rating;
    var name = req.query.name;
    //await connection.execute(
    //    `begin insert into lbs_building (objectid,building_id, name, type, address, source, county_id) values (lbs_building_seq.nextval, '${building_id}', '${name}', '${type}', '${address}', '${source}',  '${county_id}');commit;end;`
    //    //            // bind value for :id
    //);
    //var page = req.

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            var sql = `SELECT *
  FROM (SELECT T.*, ROWNUM RN
          FROM (select m.* from movie m where m.country like '%${country}%' and m.director like '%${director}%' and m.genre like '%${genre}%' and m.rating like '%${rating}%' and m.name like '%${name}%' `;
            var sql2 = `SELECT COUNT(*) AS TOTAL FROM movie m where m.country like '%${country}%' and m.director like '%${director}%' and m.genre like '%${genre}%' and m.rating like '%${rating}%' and m.name like '%${name}%'`;
            if (movielow !== '' && moviehigh !== '') {
                sql += `and year >= ${movielow} and year <= ${moviehigh} `;
                sql2 += `and year >= ${movielow} and year <= ${moviehigh} `;
            }
            sql += `order by m.NAME ) T) WHERE RN > ${start} AND RN <= ${end}`;
            //if (country !== '') {
            //    where += `country`
            //}
            console.log(sql);

            const result = await connection.execute(
                sql
            );
            const result2 = await connection.execute(
                sql2
            );
            var data = [];
            for (var i = 0; i < result.rows.length; i++) {
                var row = `{`;
                for (var j = 0; j < result.metaData.length; j++) {
                    if (j !== result.metaData.length - 1) {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

                    } else {
                        row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

                    }
                    //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
                }
                row += `}`;
                row = JSON.parse(row);
                data.push(row);
            }
            console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": result2.rows[0][0],
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    run();
});

router.post('/CreateMovie', function (req, res, next) {
    var body = req.body;
    var name = body.name;
    var country = body.country;
    var director = body.director;
    var genre = body.genre;
    var year = body.year;
    var rating = body.rating;

    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            var errors = [];
            if (name.length === 0) {
                errors.push("名称不能为空")
            }
            if (country.length === 0) {
                errors.push("国家不能为空")
            }
            if (director.length === 0) {
                errors.push("导演不能为空")
            }
            if (genre.length === 0) {
                errors.push("类型不能为空")
            }
            if (year.length === 0) {
                errors.push("年份不能为空")
            }
            if (rating.length === 0) {
                errors.push("评分不能为空")
            }
            if (errors.length !== 0) {
                res.json({
                    "code": 0,
                    "msg": "",
                    "count": -1,
                    "data": errors
                });
            } else {
                var sql = `BEGIN INSERT INTO movie (name,country,director,genre,year,rating) VALUES('${name}','${country}','${director}','${genre}','${year}','${rating}');commit;end;`;
                const result = await connection.execute(
                    sql
                );
                var data = [];
                res.json({
                    "code": 0,
                    "msg": "",
                    "count": 1,
                    "data": data
                });
            }
           
            //          var sql = `SELECT *
            //FROM (SELECT T.*, ROWNUM RN
            //        FROM (select p.* from product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%' `;
            //          var sql2 = `SELECT COUNT(*) AS TOTAL FROM product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%'`;
            //          if (pricelow !== '' && pricehigh !== '') {
            //              sql += `and price >= ${pricelow} and price <= ${pricehigh} `;
            //              sql2 += `and price >= ${pricelow} and price <= ${pricehigh} `;
            //          }
            //          sql += `order by p.NAME ) T) WHERE RN > ${start} AND RN <= ${end}`;
            //          //if (country !== '') {
            //          //    where += `country`
            //          //}
            //          console.log(sql);

            //          const result = await connection.execute(
            //              sql
            //          );
            //          const result2 = await connection.execute(
            //              sql2
            //          );
            //for (var i = 0; i < result.rows.length; i++) {
            //    var row = `{`;
            //    for (var j = 0; j < result.metaData.length; j++) {
            //        if (j !== result.metaData.length - 1) {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

            //        } else {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

            //        }
            //        //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
            //    }
            //    row += `}`;
            //    row = JSON.parse(row);
            //    data.push(row);
            //}
            //console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    run();
});

router.post('/EditMovie', function (req, res, next) {
    var body = req.body;
    var name = body.name;
    var country = body.country;
    var director = body.director;
    var genre = body.genre;
    var year = body.year;
    var rating = body.rating;
    var MOVIEID = req.query.MOVIEID;
    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            var sql = `BEGIN UPDATE movie SET name = '${name}', country = '${country}', director = '${director}', genre = '${genre}', year = '${year}', rating = '${rating}' where movieid = '${MOVIEID}';commit;end;`;
            const result = await connection.execute(
                sql
            );
  //          var sql = `SELECT *
  //FROM (SELECT T.*, ROWNUM RN
  //        FROM (select p.* from product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%' `;
  //          var sql2 = `SELECT COUNT(*) AS TOTAL FROM product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%'`;
  //          if (pricelow !== '' && pricehigh !== '') {
  //              sql += `and price >= ${pricelow} and price <= ${pricehigh} `;
  //              sql2 += `and price >= ${pricelow} and price <= ${pricehigh} `;
  //          }
  //          sql += `order by p.NAME ) T) WHERE RN > ${start} AND RN <= ${end}`;
  //          //if (country !== '') {
  //          //    where += `country`
  //          //}
  //          console.log(sql);

  //          const result = await connection.execute(
  //              sql
  //          );
  //          const result2 = await connection.execute(
  //              sql2
  //          );
            var data = [];
            //for (var i = 0; i < result.rows.length; i++) {
            //    var row = `{`;
            //    for (var j = 0; j < result.metaData.length; j++) {
            //        if (j !== result.metaData.length - 1) {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

            //        } else {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

            //        }
            //        //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
            //    }
            //    row += `}`;
            //    row = JSON.parse(row);
            //    data.push(row);
            //}
            //console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": 1,
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    run();
});


router.post('/DeleteMovie', function (req, res, next) {
    var MOVIEID = req.query.MOVIEID;
    const mypw = "LBSPWD";

    async function run() {

        let connection;

        try {
            connection = await oracledb.getConnection({
                user: "LBSUSER2",
                password: mypw,
                connectString: "localhost/ORCL"

            });
            var sql = `BEGIN DELETE FROM movie where movieid = '${MOVIEID}';commit;end;`;
            const result = await connection.execute(
                sql
            );
            //          var sql = `SELECT *
            //FROM (SELECT T.*, ROWNUM RN
            //        FROM (select p.* from product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%' `;
            //          var sql2 = `SELECT COUNT(*) AS TOTAL FROM product p where p.country like '%${country}%' and p.material like '%${material}%' and p.company like '%${company}%' and p.color like '%${color}%' and p.name like '%${name}%'`;
            //          if (pricelow !== '' && pricehigh !== '') {
            //              sql += `and price >= ${pricelow} and price <= ${pricehigh} `;
            //              sql2 += `and price >= ${pricelow} and price <= ${pricehigh} `;
            //          }
            //          sql += `order by p.NAME ) T) WHERE RN > ${start} AND RN <= ${end}`;
            //          //if (country !== '') {
            //          //    where += `country`
            //          //}
            //          console.log(sql);

            //          const result = await connection.execute(
            //              sql
            //          );
            //          const result2 = await connection.execute(
            //              sql2
            //          );
            var data = [];
            //for (var i = 0; i < result.rows.length; i++) {
            //    var row = `{`;
            //    for (var j = 0; j < result.metaData.length; j++) {
            //        if (j !== result.metaData.length - 1) {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}",`;

            //        } else {
            //            row += `"${result.metaData[j]["name"]}":"${result.rows[i][j]}"`;

            //        }
            //        //data.push(`{"${result.metaData[j]["name"]}":"${result.rows[i][j]}"}`);
            //    }
            //    row += `}`;
            //    row = JSON.parse(row);
            //    data.push(row);
            //}
            //console.log(data);
            //console.log(JSON.stringify(result));
            //console.log(JSON.stringify(result2));

            res.json({
                "code": 0,
                "msg": "",
                "count": 1,
                "data": data
            });


            //console.log('r ' + result);
            //console.log('r2' + result2);
        } catch (err) {
            console.error(err);
            console.log(bounds + ' ' + id);
        } finally {
            if (connection) {
                try {
                    await connection.close();
                } catch (err) {
                    console.error(err);
                }
            }
        }
    }

    run();
});

module.exports = router;
