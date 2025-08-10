function	age(birthday)
{
	today = new Date();
	age = today.getFullYear() - birthday.getFullYear();
	if (today.getMonth() - birthday.getMonth() < 0 ||
(!(today.getMonth() - birthday.getMonth()) && (today.getDate() - birthday.getDate() < 0)))
		age--;
	return (age);
}

function	scrolling(pixel)
{
	window.scroll(0, pixel);
}

function	display(elem)
{
	elem.style.display = 'block';
}

function	hide(elem)
{
	elem.style.display = 'none';
}

function	print_char(div, c, timer)
{
	setTimeout(() => {div.append(c)}, timer);
}


function	print_input(div, input, slow)
{
	setTimeout(display, slow, div);
	slow += 500;
	let i = 0;
	for (let i = 0; i < input.command.length; i++)
	{
		print_char(div, input.command[i], slow);
		slow += 100;
	}
	if (input.args)
	{
		for (let i = 0; i < input.args.length; i++)
		{
			let node = document.createElement("h3");
			setTimeout(() => {div.appendChild(node)}, slow);
			slow += 100;
			for (let j = 0; j < input.args[i].length; j++)
			{
				print_char(node, input.args[i][j], slow);
				slow += 100;
			}
		}
	}
	return (slow);
}

window.onbeforeunload = function ()
{
	window.scrollTo(0, 0);
}

var input = [
	{command: "pwd"},
	{
		command: "cat",
		args: ["hello_world.txt"]
	},
	{
		command: "cd",
		args: ["Studies"]
	},
	{command: "ls -l"},
	{
		command: "cat",
		args: [".working_environment.txt"]
	},
	{
		command: "cd",
		args: ["../Programming Language"]
	},
	{command: "ls -l"}
];


document.addEventListener("DOMContentLoaded", function(event)
{ 
	// Passing Aruguments Birthday It Will Change Based on My Age,Dynamicaly
	document.getElementById('age').innerHTML = age(new Date(2003, 7, 26));   

	document.getElementById('login').addEventListener("click", function()
	{
		let i = 0;
		let slow = 1;
		while (i < window.innerHeight)
		{
			slow += 0.1;
			if (i > window.innerHeight * (3 / 4))
				slow += 0.000001 * i;
			else if (i < window.innerHeight * (1 / 4))
				slow -= 0.000001 * (window.innerHeight - i);	
			setTimeout(scrolling, (0.01 * slow) * i, i);
			i++;
		}
		slow = (0.01 * slow) * i; 
		document.body.style.overflow = 'auto';
		setTimeout(() => {hide(document.getElementById("header"))}, slow);
		div_inputs = document.getElementsByClassName("input");
		div_outputs = document.getElementsByClassName("output");
		i = 0;
		while (i < div_inputs.length)
		{		
			slow = print_input(div_inputs[i], input[i], slow);
			setTimeout(display, slow + 1, div_outputs[i]);
			i++;
		}
	});
});


