

angular
	.module("SmartMirror") //,['ngAnimate']
	.controller("UploadPicsController", function (
		$scope,
		$timeout,
		UploadPicsService
	) {
		let pathtoImage=UploadPicsService.init().then(pathtoImage=>{
			$scope.uploadPics={}
			$scope.uploadPics.imageURL=pathtoImage
		}).catch(error=>{console.error(error)})

	}
	)