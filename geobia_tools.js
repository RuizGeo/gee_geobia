
//var folder = ee.data.getAssetRoots().id
var listAssets = ee.data.listAssets("Insert your Asset-path")
//var assets = ee.data.listAssets(folder)


//Filter Image and Table datas
var filter_asset= listAssets['assets'];

var filter_asset_images = filter_asset.filter(function(asset){
    return asset.type==='IMAGE';
});
var filter_asset_table = filter_asset.filter(function(asset){
    return asset.type==='TABLE';
});
//Extract the ID of each image object.
var id_assets_images  = filter_asset_images.map(function(item) {
   return item['id']});

//Extract the ID of each table object.
var id_assets_table  = filter_asset_table.map(function(item) {
   return item['id'] });
print(id_assets_images)

//print(ee.List(listAssets['assets']).filter(ee.Filter.expression('type=TABLE')))
//print(ee.data.getList(folder))

//#############################################
//##################   Panel ##################
//#############################################
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '430px',
  //position: 'bottom-left'
  }});
  //ui.root.clear();
//ui.root.add(panel)
//ui.root.insert(1,panel);

//############# Label GEOBIA ############
var label = ui.Label('Geographic Object-Based Image Analysis');
label.style().set({
  width: '400px',
  textAlign: 'center',
  margin: '10px 10px 10px 10px',
  fontSize: '20px',
  border:  '2px solid black',
  fontWeight: 'bold'
});

//Add panel
panel.add(label);
//############# Label select Image ############
var label_image = ui.Label('Image');
label.style().set({
  width: '400px',
  textAlign: 'left',
  fontSize: '20px'
  //margin: '10px 10px 10px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});

//Add panel
panel.add(label_image);

//##############Select Image ##################
var select_image = ui.Select({
  items: id_assets_images,
  value:id_assets_images[2],
  style: {width: '400px'},
  onChange: function(key) {
    print(select_image.getValue());
  }});

// Set a place holder.
select_image.setPlaceholder(id_assets_images[0]).style().set({
  width: '400px',
  textAlign: 'center',
  margin: '10px 10px 10px 10px',
  fontSize: '20px'
});
//Add panel
panel.add(select_image);
//############# Label select samples ############
var label_samples = ui.Label('Samples');
label.style().set({
  width: '400px',
  textAlign: 'left',
  fontSize: '20px'
  //margin: '10px 10px 10px 10px',
  
  //border:  '2px solid black',
  //fontWeight: 'bold'
});

//Add panel
panel.add(label_samples);

//##############Select sample ##################
var select_samples = ui.Select({
  items: id_assets_table,
  value: id_assets_table[10],
  style: {width: '400px'},
  onChange: function(key) {
    var cols = ee.FeatureCollection(key).getInfo()['columns'];
    var list_cols = Object.keys(cols);
    //print(select_samples.getValue());
    //print(list_cols);
    //select_field_class.setDisabled(false)
    select_field_class.items().reset(list_cols);
    select_field_class.setPlaceholder(list_cols[0]);
    select_field_class.setValue(list_cols[0]);
    //select_field_class.items(ee.List(list_cols))
    
  }
});

// Set a place holder.
select_samples.setPlaceholder(id_assets_table[10]).style().set({
  width: '400px',
  textAlign: 'center',
  margin: '10px 10px 10px 10px',
  fontSize: '20px'
});
//Add panel
panel.add(select_samples);

//############# Label select Field class ############
var label_field = ui.Label('Field class')
label.style().set({
  width: '400px',
  textAlign: 'left',
  fontSize: '20px'
  //margin: '1px 1px 1px 1px'
  
  //border:  '2px solid black',
  //fontWeight: 'bold'
});

//Add panel
panel.add(label_field);

//##############Select Field Class ##################
var cols = ee.FeatureCollection(id_assets_table[0]).getInfo()['columns']
var list_cols = Object.keys(cols)

    
var select_field_class = ui.Select({
  items: list_cols,
  value: list_cols[0],
  style: {width: '400px'},
  onChange: function(key) {
    print('Change field class');
  }
});

// Set a place holder.
select_field_class.setPlaceholder(list_cols[0]).style().set({
  width: '400px',
  textAlign: 'center',
  fontSize: '20px'
});
//Add panel
panel.add(select_field_class);

//############# Label split samples ############
var label_split_samples = ui.Label('Split samples')
label_split_samples.style().set({
  width: '400px',
  textAlign: 'center',
  fontSize: '20px'});
//Add panel
panel.add(label_split_samples);

//############# Label training samples ############
var label_train_samples = ui.Label('Training samples (%)')
label_train_samples.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '1px 1px 1px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_train_samples);

//############# Slider training samples############
var slider_train_samples = ui.Slider({
  min: 0,  max: 100,  value:80,  step: 1,
  style: {width: '400px', textAlign: 'center',  fontSize: '14px'},
  onChange: function(value) {
        var set_value_test = ee.Number(100).subtract(ee.Number(value))
         slider_test_samples.setValue(set_value_test.getInfo())}
});

//Add panel
panel.add(slider_train_samples);

//############# Label test samples ############
var label_test_samples = ui.Label('Test samples (%)')
label_test_samples.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '1px 1px 1px 10px'
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_test_samples);

//############# Slider test samples############
var set_test_value = ee.String(ee.Number(100).subtract(ee.Number(slider_train_samples.getValue())));

var slider_test_samples = ui.Slider({
  min: 0,  max: 100,  value:set_test_value.getInfo(),  step: 1,
  style: {width: '400px', textAlign: 'center',  fontSize: '14px'},
  onChange: function(value) {
    var set_value_train = ee.Number(100).subtract(ee.Number(value))
    slider_train_samples.setValue(set_value_train.getInfo())}
  
});
//Set value test samples
slider_test_samples.setValue(set_test_value.getInfo())
//Add panel
panel.add(slider_test_samples);

//############# Label clustering ############
var label_cluster = ui.Label('Superpixel clustering')
label_cluster.style().set({
  width: '400px',
  textAlign: 'center',
  fontSize: '20px'});
//Add panel
panel.add(label_cluster);

//############# Label seeds ############
var label_seeds = ui.Label('Seeds')
label_seeds.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '1px 1px 1px 10px'
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_seeds);
//############# Slider seeds ############
var slider_seeds = ui.Slider({
  min: 0,  max: 2000,  value:0,  step: 1,
  style: {width: '400px', textAlign: 'center',  fontSize: '14px'},
  onChange: function(value) {
    print(value)}
});
//Add panel
panel.add(slider_seeds);
//############# Label size ############
var label_size = ui.Label('Size')
label_size.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '1px 1px 1px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_size);

//############# Slider size ############
var slider_size = ui.Slider({
  min: 1,  max: 100,  value:10,  step: 1,
  style: {width: '400px', textAlign: 'center',  fontSize: '14px'},
  onChange: function(value) {
    print(value)}
});
//Add panel
panel.add(slider_size);

//############# Label compactness ############
var label_compac = ui.Label('Compactness')
label_compac.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '1px 1px 1px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_compac);

//############# Slider compactness ############
var slider_compac = ui.Slider({
  min: 0,  max: 1000,  value:0,  step: 1,
  style: {width: '400px', textAlign: 'center',  fontSize: '14px'},
  onChange: function(value) {
    print(value)}
});
//Add panel
panel.add(slider_compac);

//############# Label neighborhoodSize############
var label_neigh = ui.Label('Neighborhood size (* Size)')
label_neigh.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '1px 1px 1px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_neigh);

//############# Slider neighborhoodSize############
var slider_neigh = ui.Slider({
  min: 0,  max: 100,  value:2,  step: 1,
  style: {width: '400px', textAlign: 'center',  fontSize: '14px'},
  onChange: function(value) {
    print(value)}
});
//Add panel
panel.add(slider_neigh);

//############# Label connectivity############
var label_connec = ui.Label('Connectivity')
label_connec.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '1px 1px 1px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_connec);

//##############Select connectivity ##################
var connectivity = {four: [4], eight: [8] };

var select_connec = ui.Select({
  items:  Object.keys(connectivity),
  placeholder	: 'eight',
  value:  'eight',
  style: {width: '400px'},
  onChange: function(key) {
    print(ee.Number(connectivity[key][0])); }});

//Add panel
panel.add(select_connec);

//############# Label Random Forest ############
var label_class_algs = ui.Label('Supervised classification algorithms');
label_class_algs.style().set({
  width: '400px',
  textAlign: 'center',
  fontSize: '20px'});
//Add panel
panel.add(label_class_algs );
//############# Select algorithms ############
var class_algs = {RandomForest: ['Number of trees', 'Maximum number of leaf nodes in each tree'], 
            SVM: ['Degree','Gamma'] };

var select_sel_alg = ui.Select({
  items:  Object.keys(class_algs),
  value: Object.keys(class_algs)[0],
  placeholder	: Object.keys(class_algs)[0],
  style: {width: '400px'},
  
  onChange: function(key) {
        //select_sel_alg.getValue();
    if(select_sel_alg.getValue()=='RandomForest'){
      print('Random Forest')
      //Set value label parameter
      label_parameter1.setValue('Number of trees');
      label_parameter2.setValue('Maximum number of leaf nodes in each tree');
      // Set values parameters
      slider_parameter1.set({ min: 0,  max: 1000,  value:50,  step: 1});
      slider_parameter2.set({ min: 0,  max: 1000,  value:200,  step: 1});
    } 
    else  {
      print('SVM');
      //Set value label parameter
      label_parameter1.setValue('Degree');
      label_parameter2.setValue('Gamma');
      // Set values parameters
      slider_parameter1.set({ min: 0,  max: 1000,  value:10,  step: 0.0001});
      slider_parameter2.set({ min: 0,  max: 1000,  value:10,  step: 0.0001});
     }}});
    
// Set a place holder.
select_sel_alg.setPlaceholder( Object.keys(class_algs)[0]);
//select_sel_alg.setDisabled(false)
//Add panel
panel.add(select_sel_alg);
//############# Label parameter 1 ############
var label_parameter1 = ui.Label(class_algs['RandomForest'][0]);
label_parameter1.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '1px 1px 1px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_parameter1);
//############# Slider parameter 1 ############
var slider_parameter1 = ui.Slider({
  min: 0,  max: 2000,  value:50,  step: 1,
  style: {width: '400px', textAlign: 'center',  fontSize: '14px'}
  //onChange: function(value) {
  //      var set_value_test = ee.Number(100).subtract(ee.Number(value))
  //      slider_test_samples.setValue(set_value_test.getInfo())}
});
//Add panel
panel.add(slider_parameter1);
//############# Label parameter 2 ############
var label_parameter2 = ui.Label(class_algs['RandomForest'][1])
label_parameter2.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '1px 1px 1px 10px'
  //border:  '2px solid black',
  //fontWeight: 'bold'F
});
//Add panel
panel.add(label_parameter2);
//############# Slider parameter 2 ############
var slider_parameter2 = ui.Slider({
  min: 0,  max: 2000,  value:200,  step: 1,
  style: {width: '400px', textAlign: 'center',  fontSize: '14px'}
  //onChange: function(value) {
   // print(value)}
  
});
//Set value test samples
//slider_parameter2.setValue(set_test_value.getInfo())
//Add panel
panel.add(slider_parameter2);

//############# Button Run  ############
var button = ui.Button({
  label: 'Run',
  style: {width: '400px', textAlign: 'center',  fontSize: '14px'},
  onClick: function() {
    //################# Get values from GUI #################
    var id_asset_image = select_image.getValue();
    var id_asset_sample = select_samples.getValue();
    var field_class = select_field_class.getValue();
    var split_value_test = ee.Number(slider_test_samples.getValue()).divide(100);
    print('split_value_test: ',split_value_test);
    var split_value_train = ee.Number(slider_train_samples.getValue()).divide(100);
    print('split_value_train: ',split_value_train);
    var seeds_value_cluster = slider_seeds.getValue();
    var size_value_cluster = slider_size.getValue();
    var compac_value_cluster = slider_compac.getValue();
    var neigh_value_cluster = slider_neigh.getValue();
    var connec_value_cluster = select_connec.getValue();
    
    
    //#################    Read datasets      #################
    var image = ee.Image(id_asset_image);
    var sample = ee.FeatureCollection(id_asset_sample);
    //var sample = sample.filter(ee.Filter.notNull([field_class]));
    print('id_asset_sample: ',id_asset_sample)
    print('Size sample: ',sample.size())
    
    //#################    Get metadata      #################
    //Get band names
    var bandNames = image.bandNames();
    print(bandNames.get(0).getInfo())
    //Get band names cluster image
    var bandsCluster  = bandNames.map(function(item) {
       return ee.String(item).cat('_mean')})
    //Get nominal scale
    var nom_scale = image.select(bandNames.get(0).getInfo()).projection().nominalScale()
    print('nom_scale: ',nom_scale)
 
    //#################  Superpixel cluster  #################
    //Seeds
    if(seeds_value_cluster === 0){
        var seeds = null;
    } else{    
      //Create seeds
      var seeds = ee.Algorithms.Image.Segmentation.seedGrid(seeds_value_cluster);
    }
    //Neighborhood Size	
    if (neigh_value_cluster === 0) {
      //Set null value
      var neigh_value_cluster = null;
      
    } else{
      //If == 1 multiply by neigh_value_cluster
      var neigh_value_cluster = ee.Number(size_value_cluster).multiply(neigh_value_cluster);
    }
    //print
    print('Seeds: ',seeds_value_cluster);
    print('neigh_value_cluster: ',neigh_value_cluster);
    // Run SNIC .
    var snic = ee.Algorithms.Image.Segmentation.SNIC({
          image: image, 
          size: size_value_cluster,
          compactness: compac_value_cluster,
          connectivity: connectivity[connec_value_cluster][0],
          neighborhoodSize:neigh_value_cluster,
          seeds:seeds
        });
    
    print(snic);
    
    //#######  Create training samples from regions ###########
    //Concatenate images
    //var objectPropertiesImage = ee.Image.cat([
    //  snic.select(bandsCluster),
    //]).float();
    //Create dataset from objects
    var sample_regions = snic.select(bandsCluster).sampleRegions({
        collection: sample,
        properties: [field_class],
        scale: nom_scale
        }).filter(ee.Filter.neq(bandsCluster.get(0), null));
        //print(' Sample regions: ',sample_regions.getInfo());
        
    // Filter out the null property values and try again.
    var sample_regions = sample_regions.filter(
      ee.Filter.notNull(sample_regions.first().propertyNames())
    );
        
    //#################    Split samples     #################
    // random uniforms to the training dataset.
    var withRandom = sample_regions.randomColumn('random');
    // We want to reserve some of the data for testing, to avoid overfitting the model.
    var trainingPartition = withRandom.filter(ee.Filter.lt('random', split_value_train));
    var testingPartition = withRandom.filter(ee.Filter.gte('random', split_value_train));
    print('withRandom: ',withRandom.size());
    print('trainingPartition: ',trainingPartition);
    print('testingPartition: ',testingPartition.size());

    
    //################# Supervised classification #################
    //select_sel_alg.getValue();
    if(select_sel_alg.getValue()=='RandomForest' ){
      // Get parameters values
      var param1_value_classify = slider_parameter1.getValue();
      var param2_value_classify = slider_parameter2.getValue();
      // Trained Random Forest Classifier
      var trained_classifier = ee.Classifier.smileRandomForest({numberOfTrees:param1_value_classify,
      maxNodes:param2_value_classify}).train({
        features: trainingPartition,
        classProperty: field_class,
        inputProperties: bandsCluster
      });
    
    } 
    else if (select_sel_alg.getValue()=='SVM') {
      // Get parameters values
      var param1_value_classify = slider_parameter1.getValue();
      var param2_value_classify = slider_parameter2.getValue();
      // Trained Random Forest Classifier
      var trained_classifier = ee.Classifier.libsvm({kernelType: 'RBF',
      degree :param1_value_classify,
      gamma:param2_value_classify}).train({
        features: trainingPartition,
        classProperty: field_class,
        inputProperties: bandsCluster
      });
    }
    
    else{print('Select supervised classification algorithms')}
    
    //################# Classification validation #################
    // Classify the test FeatureCollection.
    var tested_classifier = testingPartition.classify(trained_classifier);
   // print('tested_classifier: ',tested_classifier);

    // Get a confusion matrix representing expected accuracy.
    var testAccuracy = tested_classifier.errorMatrix(field_class, 'classification');
    //print('Validation error matrix: ', testAccuracy);
    //print('Validation overall accuracy: ', testAccuracy.accuracy());
    label_acc_test.setValue('Accuracy (test samples): '+testAccuracy.accuracy().getInfo());
    //kappa
    label_kappa_test.setValue('Kappa (test samples): '+testAccuracy.kappa().getInfo());
    // Print the confusion matrix.
    var confusionMatrix = trained_classifier.confusionMatrix();
    //print('Confusion Matrix', confusionMatrix);
    // print('Training overall accuracy: ', confusionMatrix.accuracy());
    label_acc_train.setValue('Accuracy (training samples): '+confusionMatrix.accuracy().getInfo());
    //kappa
    label_kappa_train.setValue('Kappa (training samples): '+confusionMatrix.kappa().getInfo());
    // Classify the image with the same bands used for training.
    var classified = snic.select(bandsCluster).classify(trained_classifier);
    // Create a binary mask.
    //var mask_nodata = image.eq(image);
    //Center classified
    Map.centerObject(classified, 13);
    //Clear list layers
    Map.layers().reset();
    // Add map layers
    Map.addLayer(snic, {bands: ['b3_mean', 'b2_mean', 'b1_mean'], min:0, max:1000, gamma: 0.8}, 'SNIC-RGB', false);
    Map.addLayer(snic.select('clusters').randomVisualizer(), {}, 'Cluster');
    //Map.addLayer(snic, {bands: ['red_mean', 'green_mean', 'blue_mean'], min:0, max:1000, gamma: 0.8}, 'Means clusters', false);
    Map.addLayer(classified.randomVisualizer(),{},  'classification');
    
    
    //################################################################################
 
    //######################  Classification ALL  ####################################
    // Trained Random Forest Classifier
    var trained_classifier_all = ee.Classifier.smileRandomForest({numberOfTrees:param1_value_classify
    ,maxNodes:param2_value_classify})
    .train({features: sample_regions,
        classProperty: field_class,
        inputProperties: bandsCluster});
    // Classify the image with the same bands used for training.
    var classified_all = snic.select(bandsCluster).classify(trained_classifier_all);
    Map.addLayer(classified_all.randomVisualizer(),{},  'classified_all');
    //##########################      Export      ####################################
    //Clear list layers
    //print(Map.layers());
    // Export the cluster
    Export.image.toDrive({
      image: classified_all,
      description: 'Classification',
      scale: nom_scale.getInfo(),
      region: image.geometry()
    });
    // Export the classification
    Export.image.toDrive({
      image: snic.select('clusters'),
      description: 'SLIC',
      scale: nom_scale.getInfo(),
      region: image.geometry()
    });

  }
});
//Add panel
panel.add(button);

//############# Label result train #######################
var label_acc_train = ui.Label('Overall accuracy (training samples): ');
label_acc_train.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '10px 10px 10px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_acc_train);
//############# Label result test #######################
var label_acc_test = ui.Label('Overall accuracy (test samples): ');
label_acc_test.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '10px 10px 10px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_acc_test);
//############# Label kappa train #######################
var label_kappa_train = ui.Label('Kappa (training samples): ');
label_kappa_train.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '10px 10px 10px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_kappa_train);
//############# Label kappa test #######################
var label_kappa_test = ui.Label('Kappa (test samples): ');
label_kappa_test.style().set({
  width: '400px',  textAlign: 'left',  fontSize: '14px',  margin: '10px 10px 10px 10px',
  //border:  '2px solid black',
  //fontWeight: 'bold'
});
//Add panel
panel.add(label_kappa_test);
//############# Button Export cluster  ############

var button_export_cluster = ui.Button({
 label: 'Export cluster',
  style: {width: '400px', textAlign: 'center',  fontSize: '14px'},
  onClick: function() {
  //Export the image, specifying scale and region.
  Export.image.toDrive({
      image: snic.select('clusters'),
      description: 'Cluster',
      scale: nom_scale,
      region: image.geometry()
    });
    
  }});
//Add panel
//panel.add(button_export_cluster);
ui.root.add(panel);
//############# Button Export classification  ############
//var button_export_classify = ui.Button({
//  label: 'Export classification',
//  style: {width: '400px', textAlign: 'center',  fontSize: '14px'},
//  onClick: function() {
    // Export the image, specifying scale and region.
//    Export.image.toDrive({
//      image: classified,
//      description: 'Classification',
//      scale: nom_scale,
//      region: image.geometry()
//    });
    
//  }});
//Add panel
//panel.add(button_export_classify);
//####################################################
//ui.root.clear();
//ui.root.add(panel)
//ui.root.insert(1,panel);
