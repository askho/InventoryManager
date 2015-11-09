﻿CREATE VIEW [dbo].[InventoryUsage]
	AS SELECT inv.inventoryID,
		inv.condition,
		inv.dateAdded,
		inv.itemID,
		inv.price,
		inv.purchasedAt,
		mem.memberID,
		mem.fName,
		mem.lName,
		item.itemName,
		item.itemDescription,
		item.type
		FROM Inventory inv
			LEFT JOIN EventInventory ei
				ON ei.inventoryID = inv.inventoryID
			LEFT JOIN Members mem
				ON ei.memberID = mem.memberID
			LEFT JOIN Items item
				ON item.itemID = inv.itemID
