<?

/**
 * Showfor Behavior (CakePHP)
 *
 * This behavior assumes the related model is a belongsTo relationship.
 */
class ShowforBehavior extends ModelBehavior {
    public function showfor(&$model, $relatedModel)
	{
        // Get the foreign key from the related model name.
        $fk = $model->belongsTo[$relatedModel]['foreignKey'];
        
        // Ensure that containable is attached.
        if(!$model->Behaviors->attached('Containable'));
            $model->Behaviors->attach('Containable');
		
        // Find the records.
        $records = $model->find('all', array(
			'contain' => array(
				$relatedModel
			)
		));
		
        // Loop through the records and build the select options array.
		foreach($records as &$record)
		{
			$record = array(
				'value' => $record[$model->name]['id'],
				'name' => $record[$model->name][$model->displayField], // Use the display field just like find('list')
				'class' => "show-for-{$record[$model->name][$fk]}" // special class for js
			);
		}
		
		return $records;
	}
}