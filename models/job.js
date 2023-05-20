"use strict";

const db = require("../db");
const { BadRequestError, NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for jobs. */

class Job {
  /** Create a job (from data), update db, return new job data.
   *
   * data should be { title, salary, equity, companyHandle }
   *
   * Returns { id, title, salary, equity, companyHandle }
   **/
  static async create({ title, salary, equity, company_handle }) {
    const result = await db.query(
        `INSERT INTO jobs (title,
            salary,
            equity,
            company_handle)
        VALUES ($1, $2, $3, $4)
        RETURNING id, title, salary, equity, company_handle as "companyHandle`,
        [title, salary, equity, company_handle]
    );
    let job = result.rows[0]
  }
}