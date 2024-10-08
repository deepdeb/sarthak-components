const { readPool } = require('../../config/mysql');
const writePool = require('../../config/mysql').writePool;

exports.createSegment = async (data) => {
    try {
        let existing_segment_sql = "SELECT segment_id FROM segment WHERE segment_name = ?"
        const [existing_segment_resp] = await readPool.query(existing_segment_sql, data.segment_name);

        if(existing_segment_resp.length > 0) {
            return 'Segment already exists'
        }

        let insert_segment_sql = "INSERT INTO segment (segment_name) VALUES (?)"
        const [insert_segment_resp] = await writePool.query(insert_segment_sql, [data.segment_name]);

        if(insert_segment_resp) {
        return 'Segment created successfully'
        }
    } catch (error) {
        console.log('Create segment service error: ', error);
        return;
    }
}

exports.editSegment = async (data) => {
    try {
        let update_segment_sql = "UPDATE segment SET segment_name = ? WHERE segment_id = ?"
        const [update_segment_resp] = await writePool.query(update_segment_sql, [data.segment_name, data.segment_id]);

        if(update_segment_resp) {
            return 'Segment updated successfully'
        }
    } catch (error) {
        console.log('Edit segment service error: ', error);
        return;
    }
}