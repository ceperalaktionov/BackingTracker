angular.module('AudioTrackr').factory('songFactory', function () {
	return [
		{
			name: 'Battery',
			band: 'Metallica',
			link: 'http://muzmania.org.ua/download.php?id=7959&source=0&key=725c9fd2c8089d4d6cbaf6e062a4e265',
			tracks: [
				{
					name: 'guitar',
					url: 'files/Metallica/Battery/guitar.mp3'
				},
				{
					name: 'drums',
					url: 'files/Metallica/Battery/drums.mp3'
				},
				{
					name: 'vocals',
					url: 'files/Metallica/Battery/vocals.mp3'
				}
			]
		},
		{
			name: 'Painkiller',
			band: 'Judas Priest',
			link: 'http://muzmania.org.ua/download.php?id=35027&source=0&key=182060773e24f9adeef7efd5f6bc7b7f',
			tracks: [
				{
					name: 'guitar',
					url: 'files/JudasPriest/Painkiller/guitar.mp3'
				},
				{
					name: 'drums',
					url: 'files/JudasPriest/Painkiller/drums.mp3'
				},
				{
					name: 'vocals',
					url: 'files/JudasPriest/Painkiller/vocals.mp3'
				},
				{
					name: 'bass',
					url: 'files/JudasPriest/Painkiller/bass.mp3'
				}
			]
		}
	];
});