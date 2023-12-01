const models = require('../../models');


// models.테이블명.create(데이터)
// models.테이블명.findAll(조회조건)
// models.테이블명.findByPk(primarykey)
// models.테이블명.findOne(조회조건)
// models.테이블명.update(데이터, 조회조건)
// models.테이블명.destroy(조회조건)


exports.get_products = ( _ , res) => {
  models.Products.findAll({
  }).then( (products) => {
    // DB에서 받은 products를 products변수명으로 내보냄
    res.render( 'admin/products.html' ,{ products : products });
  });
}

exports.get_products_write = ( _ , res) => {
    res.render( 'admin/write.html');
}

exports.post_products_write = async ( req , res ) => {
  // res.send(req.body);
  // models.Products.create(req.body).then(() =>{ });
  await models.Products.create({
    name : req.body.name,
    price : req.body.price ,
    description : req.body.description
  })
  res.redirect('/admin/products');
}

exports.get_products_detail = async ( req , res ) => {
    //req.params.id
  await models.Products.findByPk(req.params.id).then( (product) => {
    res.render('admin/detail.html', { product: product });  
  });
};

exports.get_products_edit = async ( req , res ) => {
  //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
  const product = await models.Products.findByPk(req.params.id);
  res.render('admin/write.html', { product });
};

exports.post_products_edit = async( req , res ) => {
  await models.Products.update(
    {
      name : req.body.name,
      price : req.body.price ,
      description : req.body.description
    }, 
    { 
      where : { id: req.params.id } 
    }
  );
  res.redirect('/admin/products/detail/' + req.params.id );
}

exports.get_products_delete = async( req , res ) => {
  await models.Products.destroy({
    where: {
      id: req.params.id
    }
  });
  res.redirect('/admin/products');
};