(function(){

	var hiredAm;

	function hireTech() {
		var game = GameManager.company.currentGame;
		if (game != null) {
			var changeStuff = Math.floor(hiredAm/2000);
			game.technologyPoints += changeStuff;
			GameManager.company.adjustCash(-hiredAm, "Contractor Hire");
		}
	};

	function hireDes() {
		var game = GameManager.company.currentGame;
		if (game != null) {
			var changeStuff = Math.floor(hiredAm/2000);
			game.designPoints += changeStuff;
			GameManager.company.adjustCash(-hiredAm, "Contractor Hire");
		}
	};

	UI.fullSwitch = function (a) {
		Sound.click();
		switch (a.id) {
			case "hireTech":
				hireTech();
				break;
			case "hireDes":
				hireDes();
				break;
			default:
				return;
		}
		div.dialog("close");
	};
		
	var div = $("body");
	div.append('<div id="hirePeep" class="windowBorder wideWindow" style="overflow:auto;display:none;"> <div id="toNSE" class="windowTitle smallerWindowTitle">Contractors</div>');
	div = $("#hirePeep"); 
	div.append('<div style="text-align:center;margin-left:50px;width: 675px">Welcome to the Contractor center!<BR /> Here you can hire design or technology contractors, based on how much you pay they will contribute tech and design points. Change the slider to see how many points you can get for a certain amount of money.</div><br /> <br />');
	div.append('<div id="techInfo" class="windowTitle smallerWindowTitle" style="margin-top:20px;">Tech Contractors</div>');
	div.append('<div id="techHire" style="text-align:center;margin-left:50px;width:675px;heigth:50px">Money to spend: $0</div>'); //ShareValue
	div.append('<div id="STUF" style="text-align:center;margin-left:50px;width:675px;heigth:50px">Extra Tech Points: 0</div>'); //MaxAmountOfShares
	div.append('<div id="techPay" style="margin-left:50px;width:675px;" class="WOW"></div>');
	div.append('<div id="hireTech" class="selectorButton whiteButton" onclick="UI.fullSwitch(this)" style="margin-left:50px;width: 675px">Hire Contractors</div><br /> <br />');
	div.append('<div id="desInfo" class="windowTitle smallerWindowTitle" style="margin-top:20px;">Design Contractors</div>');
	div.append('<div id="designHire" style="text-align:center;margin-left:50px;width:675px;heigth:50px">Money to spend: $0</div>'); //ShareValue
	div.append('<div id="STUFS" style="text-align:center;margin-left:50px;width:675px;heigth:50px">Extra Design Points: 0</div>'); //MaxAmountOfShares
	div.append('<div id="designPay" style="margin-left:50px;width:675px;" class="WOWW"></div>');
	div.append('<div id="hireDes" class="selectorButton whiteButton" onclick="UI.fullSwitch(this)" style="margin-left:50px;width: 675px">Hire Contractors</div>');
	
	function totalShares(z) {
		if (z == null) z = 0; 
		div.find("#techHire").html("Money to spend: $" + UI.getShortNumberString(z));
		div.find("#STUF").html("Extra Tech Points: " + Math.floor(z/2000));
	};

	function totalSharess(z) {
		if (z == null) z = 0; 
		div.find("#designHire").html("Money to spend: $" + UI.getShortNumberString(z));
		div.find("#STUFS").html("Extra Design Points: " + Math.floor(z/2000));
	};

	function clickCancel() {
		div.dialog("close");
		GameManager.resume(true);
	};		

	var OriginalContextMenu = UI.showContextMenu;
	var NewContextMenu = function (items, mouseloc) {
		var a = GameManager.company
		var c = 1 < a.currentLevel ? UI.getCharUnderCursor() : a.staff[0];
		var d = GameManager.company.currentGame;
		if (!c && d != null) {
			items.push({
				label: "Hire Contractors",
				action: function () {
					Sound.click();
					GameManager.resume(false);
					var div = $("#hirePeep");
					div.scrollTop()
					div.gdDialog({
						popout: !0,
						close: !0,
						onClose: function () {
							GameManager.resume(true);
							div.find("#techHire").html("Money to spend: $0");
							div.find("#designHire").html("Money to spend: $0");
							div.find("#STUF").html("Extra tech points: 0");
							div.find("#STUFS").html("Extra design points: 0");
							div.find(".WOW").slider({value: 0});
							div.find(".WOWW").slider({value: 0});
						}
					})
				}
			});
			div.find(".WOW").slider({
				min: 1,
				max: 2000000,
				range: "min",
				value: 0,
				animate: !1,
				slide: function (a, b) {
					hiredAm = b.value;
					totalShares(hiredAm);
				}
			});
			div.find(".WOWW").slider({
				min: 1,
				max: 2000000,
				range: "min",
				value: 0,
				animate: !1,
				slide: function (a, b) {
					hiredAm = b.value;
					totalSharess(hiredAm);
				}
			});
			//totalShares(shareAmount);
			OriginalContextMenu(items, mouseloc);
		} else {
			OriginalContextMenu(items, mouseloc);
		}
	};
	UI.showContextMenu = NewContextMenu;

})(); 



