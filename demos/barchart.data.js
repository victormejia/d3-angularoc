var data = [
	{ lang: 'JavaScript', value: 549385},
	{ lang: 'Ruby', value: 453004},
	{ lang: 'Java', value: 375857},
	{ lang: 'PHP', value: 278937},
	{ lang: 'Python', value: 247099},
	{ lang: 'C++', value: 177001},
	{ lang: 'C', value: 167175},
	{ lang: 'CSS', value: 105897},
	{ lang: 'C#', value: 76874},
	{ lang: 'Objective-C', value: 75399},
	{ lang: 'Shell', value: 70516},
	{ lang: 'Perl', value: 47954},
	{ lang: 'CoffeeScript', value: 27402},
	{ lang: 'Go', value: 23334}
	
];

d3.shuffle(data);

var data2 = [
	{ 
		year: '2012',
		values: [
			{ lang: "Ruby", value: 494188},
			{ lang: "Java", value: 419527},
			{ lang: "JavaScript", value: 415401}
		]
	},
	{
		year: '2013',
		values: [
			{ lang: "Ruby", value: 453004},
			{ lang: "Java", value: 375857},
			{ lang: "JavaScript", value: 549385}
		]
	},
	{
		year: '2014',
		values: [
			{ lang: "Ruby", value: 186982},
			{ lang: "Java", value: 203716},
			{ lang: "JavaScript", value: 281472}
		]
	},
];