const writePool = require('../../config/mysql').writePool;
exports.createEnquiry = async (data) => {
    try {
        const offer_date = data.offer_date === '' ? null : data.offer_date;

        let insert_enquiry_sql = "INSERT into enquiry (sbu_id, mentor_id, sales_person_id, customer_id, enquiry_type_id, enquiry_sub_type_id, enquiry_date, enquiry_source, principal_house, offer_date, basic_value, tentative_finalization_month, tentative_finalization_year, status_initial, remarks_initial, support_initial) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"
        const [resp] = await writePool.query(insert_enquiry_sql, [data.sbu_id, data.mentor_id, data.sales_person_id, data.customer_id, data.enquiry_type_id, data.enquiry_sub_type_id, data.enquiry_date, data.enquiry_source, data.principal_house, offer_date, data.basic_value, data.tentative_finalization_month, data.tentative_finalization_year, data.status_initial, data.remarks_initial, data.support_initial]);
        if(resp) {
            return 'Enquiry created successfully'
        }
    } catch (error) {
        console.log('Create enquiry service error:', error);
        return;
    }
}

exports.editEnquiry = async (data) => {
    try {
        const offer_date = data.offer_date === '' ? null : data.offer_date;

        let update_sql = "UPDATE enquiry SET sbu_id = ?, mentor_id = ?, sales_person_id = ?, customer_id = ?, enquiry_type_id = ?, enquiry_sub_type_id = ?, enquiry_date = ?, enquiry_source = ?, principal_house = ?, offer_date = ?, basic_value = ?, tentative_finalization_month = ?, tentative_finalization_year = ?, status_initial = ?, remarks_initial = ?, support_initial = ? WHERE enquiry_id = ?"
        const [update_resp] = await writePool.query(update_sql, [data.sbu_id, data.mentor_id, data.sales_person_id, data.customer_id, data.enquiry_type_id, data.enquiry_sub_type_id, data.enquiry_date, data.enquiry_source, data.principal_house, offer_date, data.basic_value, data.tentative_finalization_month, data.tentative_finalization_year, data.status_initial, data.remarks_initial, data.support_initial, data.enquiry_id]);
        
        if(update_resp) {
            return 'Enquiry edited successfully'
        }
    } catch (error) {
        console.log('Edit enquiry service error:', error);
        return;
    }
}