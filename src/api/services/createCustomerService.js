const writePool = require('../../config/mysql').writePool;

exports.createCustomer = async (data) => {
    try {
        await writePool.query('START TRANSACTION');

        let insert_customer_sql = "INSERT INTO customer (sbu_id, sales_person_id, customer_create_date, customer, segment_id, subsegment_id, subsubsegment_id, subsubsubsegment_id, name, designation, department, mobile, alt_mobile, email, alt_email, product_category_id, other_product_category) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        const [insert_customer_resp] = await writePool.query(insert_customer_sql, [data.sbu_id, data.sales_person_id, data.customer_create_date, data.customer, data.segment_id, data.subsegment_id, data.subsubsegment_id, data.subsubsubsegment_id, data.name, data.designation, data.department, data.mobile, data.alt_mobile, data.email, data.alt_email, data.product_category_id, data.other_product_category]);

        let insert_address_sql = "INSERT INTO address (sbu_id, customer_id, street_no, street_name, area, location, district, city, state_id, pin) VALUES (?,?,?,?,?,?,?,?,?,?)"
        const [insert_address_resp] = await writePool.query(insert_address_sql, [data.sbu_id, insert_customer_resp.insertId, data.street_no, data.street_name, data.area, data.location, data.district, data.city, data.state_id, data.pin]);

        await writePool.query('COMMIT');

        return 'Customer created successfully'
    } catch (error) {
        console.log('Error: ', error);
        return;
    }
}

exports.editCustomer = async (data) => {
    try {
        await writePool.query('START TRANSACTION');

        let update_customer_sql = "UPDATE customer SET sbu_id = ?, sales_person_id = ?, customer_create_date = ?, customer = ?, segment_id = ?, subsegment_id = ?, subsubsegment_id = ?, subsubsubsegment_id = ?, name = ?, designation = ?, department = ?, mobile = ?, alt_mobile = ?, email = ?, alt_email = ?, product_category_id = ?, other_product_category = ? WHERE customer_id = ?"
        const [update_customer_resp] = await writePool.query(update_customer_sql, [data.sbu_id, data.sales_person_id, data.customer_create_date, data.customer, data.segment_id, data.subsegment_id, data.subsubsegment_id, data.subsubsubsegment_id, data.name, data.designation, data.department, data.mobile, data.alt_mobile, data.email, data.alt_email, data.product_category_id, data.other_product_category, data.customer_id]);

        let update_address_sql = "UPDATE address SET sbu_id = ?, street_no = ?, street_name = ?, area = ?, location = ?, district = ?, city = ?, state_id = ?, pin = ? WHERE customer_id = ?"
        const [update_address_resp] = await writePool.query(update_address_sql, [data.sbu_id, data.street_no, data.street_name, data.area, data.location, data.district, data.city, data.state_id, data.pin, data.customer_id]);

        await writePool.query('COMMIT');

        return 'Customer edited successfully'
    } catch (error) {
        console.log('Create customer service error: ', error);
        return;
    }
}