// Inventory data from the Excel sheet
const ITEMS = [
  { item_number: '', item_name: '901 PVC', department: 'PVC', price: 4500, qty: 3 },
  { item_number: '2', item_name: '902 PVC', department: 'PVC', price: 4500, qty: 9 },
  { item_number: '3', item_name: '903 PVC', department: 'PVC', price: 4500, qty: 8 },
  { item_number: '4', item_name: '904 PVC', department: 'PVC', price: 4500, qty: 16 },
  { item_number: '5', item_name: '904+ PVC', department: 'PVC', price: 4500, qty: 4 },
  { item_number: '6', item_name: '906 PVC', department: 'PVC', price: 4500, qty: 6 },
  { item_number: '7', item_name: '007 PVC', department: 'PVC', price: 2500, qty: 1 },
  { item_number: '8', item_name: '901 Cornices', department: 'Cornices', price: 300, qty: null },
  { item_number: '9', item_name: '902 Cornices', department: 'Cornices', price: 300, qty: 9 },
  { item_number: '10', item_name: '903 Cornices', department: 'Cornices', price: 300, qty: 8 },
  { item_number: '11', item_name: '904 Cornices', department: 'Cornices', price: 300, qty: 29 },
  { item_number: '12', item_name: '904+ Cornices', department: 'Cornices', price: 300, qty: 32 },
  { item_number: '13', item_name: '007 Cornices', department: 'Cornices', price: 200, qty: 8 },
  { item_number: '14', item_name: '906 Cornices', department: 'Cornices', price: 300, qty: null },
  { item_number: '15', item_name: 'Gypsum Board', department: 'Gypsum', price: 840, qty: 205 },
  { item_number: '16', item_name: 'Channels', department: 'Gypsum', price: 260, qty: null },
  { item_number: '17', item_name: 'Studs', department: 'Gypsum', price: 260, qty: null },
  { item_number: '18', item_name: 'Cornice', department: 'Gypsum', price: 140, qty: null },
  { item_number: '19', item_name: 'Fibre Cornice', department: 'Gypsum', price: 700, qty: null },
  { item_number: '20', item_name: 'Gypsum Screws', department: 'Gypsum', price: 800, qty: null },
  { item_number: '21', item_name: 'Fibre Tape', department: 'Gypsum', price: 450, qty: null },
  { item_number: '22', item_name: 'Corner Tape', department: 'Gypsum', price: 1200, qty: null },
  { item_number: '23', item_name: 'Gypsum reject', department: 'Gypsum', price: 500, qty: null },
  { item_number: '24', item_name: 'Marine Board', department: 'Boards', price: 3000, qty: null },
  { item_number: '25', item_name: 'Block Board', department: 'Boards', price: 3200, qty: null },
  { item_number: '26', item_name: 'Ply Wood', department: 'Boards', price: 600, qty: null },
  { item_number: '27', item_name: '6 Ply', department: 'Boards', price: 1200, qty: null },
  { item_number: '28', item_name: '9 Ply', department: 'Boards', price: 1750, qty: null },
  { item_number: '29', item_name: 'Laminated Ply', department: 'Boards', price: 1500, qty: null },
  { item_number: '30', item_name: 'Ceiling board Plain', department: 'Boards', price: 1100, qty: null },
  { item_number: '31', item_name: 'Ceiling board design', department: 'Boards', price: 1100, qty: null },
  { item_number: '32', item_name: 'White MDF', department: 'Boards', price: 3500, qty: null },
  { item_number: '33', item_name: 'Cherry MDF', department: 'Boards', price: 3500, qty: null },
  { item_number: '34', item_name: 'Beech MDF', department: 'Boards', price: 3500, qty: null },
  { item_number: '35', item_name: 'Coimbra', department: 'Boards', price: 3600, qty: null },
  { item_number: '36', item_name: 'Amaya', department: 'Boards', price: 3600, qty: null },
  { item_number: '37', item_name: 'A. wallnut MDF', department: 'Boards', price: 3600, qty: null },
  { item_number: '38', item_name: 'K 129 MDF', department: 'Boards', price: 3500, qty: null },
  { item_number: '39', item_name: 'Versatile Oak MDF', department: 'Boards', price: 3500, qty: null },
  { item_number: '40', item_name: 'Chipboard White', department: 'Boards', price: 3000, qty: null },
  { item_number: '41', item_name: 'Chipboard Cherry', department: 'Boards', price: 3000, qty: null },
  { item_number: '42', item_name: 'Chipboard Coimbra', department: 'Boards', price: 3100, qty: null },
  { item_number: '43', item_name: '20 L Covermat', department: 'Paint (Crown)', price: 4400, qty: null },
  { item_number: '44', item_name: '4 L Covermat', department: 'Crown', price: 1350, qty: null },
  { item_number: '45', item_name: '20 L Silk Crown', department: 'Crown', price: 12300, qty: null },
  { item_number: '46', item_name: '4 L Silk', department: 'Crown', price: 2600, qty: null },
  { item_number: '47', item_name: '4 L S/gloss Crown Black', department: 'Crown', price: 2700, qty: null },
  { item_number: '48', item_name: '4 L S/gloss Crown White', department: 'Crown', price: 2600, qty: null },
  { item_number: '49', item_name: '4 L Clear Varnish', department: 'Paint (Solai)', price: 1700, qty: null },
  { item_number: '50', item_name: '1 L Clear Varnish', department: 'Solai', price: 600, qty: null },
  { item_number: '51', item_name: '4 L Mahogany Varnish', department: 'Solai', price: 1700, qty: null },
  { item_number: '52', item_name: '1 L Mahogany Varnish', department: 'Solai', price: 600, qty: null },
  { item_number: '53', item_name: '4 L Sanding Sealer', department: 'Solai', price: 2000, qty: null },
  { item_number: '54', item_name: '1 L Sanding Sealer', department: 'Solai', price: 850, qty: null },
  { item_number: '55', item_name: '1/2 Sanding Sealer', department: 'Solai', price: 500, qty: null },
  { item_number: '56', item_name: '1/4 Sanding Sealer', department: 'Solai', price: 250, qty: null },
  { item_number: '57', item_name: 'NC Cherry 1 L', department: 'NC (Solai)', price: 500, qty: null },
  { item_number: '58', item_name: 'NC Cherry 1/2 L', department: 'Solai', price: 300, qty: null },
  { item_number: '59', item_name: 'NC Sapeli 1 L', department: 'Solai', price: 500, qty: null },
  { item_number: '60', item_name: 'NC Sapeli 1/2 L', department: 'Solai', price: 300, qty: null },
  { item_number: '61', item_name: 'NC A. Wallnut 1 L', department: 'Solai', price: 500, qty: null },
  { item_number: '62', item_name: 'NC A. Wallnut 1/2 L', department: 'Solai', price: 300, qty: null },
  { item_number: '63', item_name: 'NC Peach 1 L', department: 'Solai', price: 500, qty: null },
  { item_number: '64', item_name: 'NC Peach 1/2 L', department: 'Solai', price: 300, qty: null },
  { item_number: '65', item_name: 'NC White 1  L', department: 'Solai', price: 500, qty: null },
  { item_number: '66', item_name: 'NC White 1/2  L', department: 'Solai', price: 300, qty: null },
  { item_number: '67', item_name: 'NC Salzag 1 L', department: 'Solai', price: 500, qty: null },
  { item_number: '68', item_name: 'NC Salzag 1/2 L', department: 'Solai', price: 300, qty: null },
  { item_number: '69', item_name: 'Etmo 1 L', department: 'Solai', price: 500, qty: null },
  { item_number: '70', item_name: 'Etmo 1/2 L', department: 'Solai', price: 300, qty: null },
  { item_number: '71', item_name: 'Coimbra I L', department: 'Solai', price: 500, qty: null },
  { item_number: '72', item_name: 'Coimbra I/2 L', department: 'Solai', price: 300, qty: null },
  { item_number: '73', item_name: '5 L Thinner', department: 'Solai', price: 1500, qty: null },
  { item_number: '74', item_name: '1 L Thinner', department: 'Solai', price: 350, qty: null },
  { item_number: '75', item_name: '5 L Turpentine', department: 'Solai', price: 1200, qty: null },
  { item_number: '76', item_name: '1 L Turpentine', department: 'Solai', price: 250, qty: null },
  { item_number: '77', item_name: '5 L White Spirit', department: 'Solai', price: 1300, qty: null },
  { item_number: '78', item_name: '1 L White Spirit', department: 'Solai', price: 300, qty: null },
  { item_number: '79', item_name: '500 ml Thinner', department: '', price: 200, qty: null },
  { item_number: '80', item_name: '500 ml Turpentine', department: '', price: 200, qty: null },
  { item_number: '81', item_name: '4 L Seweco sanding Sealer', department: 'Seweco', price: 2200, qty: null },
  { item_number: '82', item_name: '4 L Plastic Emulsion White', department: 'United', price: 700, qty: null },
  { item_number: '83', item_name: '4 L plastic Emulsion soft white', department: 'United', price: 700, qty: null },
  { item_number: '84', item_name: '4 L Plastic Emulsion cream', department: 'United', price: 700, qty: null },
  { item_number: '85', item_name: '1 L Plastic Emulsion White', department: 'United', price: 250, qty: null },
  { item_number: '86', item_name: '1 L Plastic Emulsion soft white', department: 'United', price: 250, qty: null },
  { item_number: '87', item_name: '1 L Plastic Emulsion Cream', department: 'United', price: 250, qty: null },
  { item_number: '88', item_name: '5 L white Spirit', department: 'United', price: 1000, qty: null },
  { item_number: '89', item_name: '1 L S/gloss White', department: 'United', price: 1000, qty: null },
  { item_number: '90', item_name: '1 L S/gloss Black', department: 'United', price: 1000, qty: null },
  { item_number: '91', item_name: 'Primer Crown', department: 'United', price: 2700, qty: null },
  { item_number: '92', item_name: 'Clear Varnish Crown', department: 'United', price: 2200, qty: null },
  { item_number: '93', item_name: '20L Superfast', department: 'Duracoat', price: 4350, qty: null },
  { item_number: '94', item_name: '4L Superfast', department: 'Duracoat', price: 1300, qty: null },
  { item_number: '95', item_name: '20L Silk Dura', department: 'Duracoat', price: 11700, qty: null },
  { item_number: '96', item_name: '4L Silk Dura', department: 'Duracoat', price: 2500, qty: null },
  { item_number: '97', item_name: '4L S/gloss Dura Black', department: 'Duracoat', price: 2600, qty: null },
  { item_number: '98', item_name: '4L S/gloss Dura White', department: 'Duracoat', price: 2550, qty: null },
  { item_number: '99', item_name: '1L S/gloss Black', department: 'Duracoat', price: 950, qty: null },
  { item_number: '100', item_name: '1 S/gloss Dura White', department: 'Duracoat', price: 950, qty: null },
  { item_number: '101', item_name: 'Prime Duracoat', department: 'Duracoat', price: 3000, qty: null },
  { item_number: '102', item_name: '20L Basco', department: 'Basco', price: 2300, qty: null },
  { item_number: '103', item_name: '4L Basco', department: 'Basco', price: 600, qty: null },
  { item_number: '104', item_name: '4L Gloss Enamel Gun Metal', department: 'Paint (United)', price: 900, qty: null },
  { item_number: '105', item_name: '4L Gloss Enamel Metal Grey', department: 'United', price: 900, qty: null },
  { item_number: '106', item_name: '4L Gloss Enamel White', department: 'United', price: 900, qty: null },
  { item_number: '107', item_name: '4L Gloss Enamel Black', department: 'United', price: 900, qty: null },
  { item_number: '108', item_name: '1L Gloss Enamel Gun Metal', department: 'United', price: 350, qty: null },
  { item_number: '109', item_name: '1L Gloss Enamel Metal Grey', department: 'United', price: 350, qty: null },
  { item_number: '110', item_name: '1L Gloss Enamel Black', department: 'United', price: 350, qty: null },
  { item_number: '111', item_name: '1L Gloss Enamel White', department: 'United', price: 350, qty: null },
  { item_number: '112', item_name: '4L United Silk Vinyl White', department: 'United', price: 1500, qty: null },
  { item_number: '113', item_name: '4L United Silk Vinyl Lolipop', department: 'United', price: 1500, qty: null },
  { item_number: '114', item_name: '4L United Silk Vinyl Tango', department: 'United', price: 1500, qty: null },
  { item_number: '115', item_name: '4L United Silk Vinyl soft white', department: 'United', price: 1500, qty: null },
  { item_number: '116', item_name: '20L Plastic Emulsion White', department: 'United', price: 1800, qty: null },
  { item_number: '117', item_name: '20L Plastic Emulsion soft white', department: 'United', price: 1800, qty: null },
  { item_number: '118', item_name: '20L Plastic Emulsion Cream', department: 'United', price: 1800, qty: null },
  { item_number: '119', item_name: 'Clear Varnish 1L', department: 'Crystal', price: 250, qty: null },
  { item_number: '120', item_name: 'Clear Varnish 1/2 L', department: 'Crystal', price: 150, qty: null },
  { item_number: '121', item_name: 'Mahogany Varnish 1L', department: 'Crystal', price: 250, qty: null },
  { item_number: '122', item_name: 'Mahogany Varnish 1/2L', department: 'Crystal', price: 150, qty: null },
  { item_number: '123', item_name: 'Light Oak 1L', department: 'Crystal', price: 250, qty: null },
  { item_number: '124', item_name: 'Light Oak 1/2L', department: 'Crystal', price: 150, qty: null },
  { item_number: '125', item_name: 'Dark Oak 1L', department: 'Crystal', price: 250, qty: null },
  { item_number: '126', item_name: 'Dark Oak 1/2L', department: 'Crystal', price: 150, qty: null },
  { item_number: '127', item_name: '1L NC Clear', department: 'Crystal', price: 250, qty: null },
  { item_number: '128', item_name: '1/2L NC Clear', department: 'Crystal', price: 150, qty: null },
  { item_number: '129', item_name: 'Curtain rods 2M Gold', department: 'Curtain rod', price: 1200, qty: null },
  { item_number: '130', item_name: 'Curtain rods 2M Black', department: 'Curtain rod', price: 1200, qty: null },
  { item_number: '131', item_name: 'Curtain rods 2M Silver', department: 'Curtain rod', price: 1200, qty: null },
  { item_number: '132', item_name: 'Curtain rods 2M Copper', department: 'Curtain rod', price: 1200, qty: null },
  { item_number: '133', item_name: 'Curtain rods 3M Gold', department: 'Curtain rod', price: 1500, qty: null },
  { item_number: '134', item_name: 'Curtain rods 3M Black', department: 'Curtain rod', price: 1500, qty: null },
  { item_number: '135', item_name: 'Curtain rods 3M Silver', department: 'Curtain rod', price: 1500, qty: null },
  { item_number: '136', item_name: 'Curtain rods 3M Copper', department: 'Curtain rod', price: 1500, qty: null },
  { item_number: '137', item_name: 'Curtain rods 1M Gold', department: 'Curtain rod', price: 950, qty: null },
  { item_number: '138', item_name: 'Curtain rods 1M Black', department: 'Curtain rod', price: 950, qty: null },
  { item_number: '139', item_name: 'Curtain rods 1M Silver', department: 'Curtain rod', price: 950, qty: null },
  { item_number: '140', item_name: 'Curtain rods 1M Copper', department: 'Curtain rod', price: 950, qty: null },
  { item_number: '141', item_name: 'Oxford Gold', department: 'Hinges', price: 200, qty: null },
  { item_number: '142', item_name: 'Oxford Silver', department: 'Hinges', price: 200, qty: null },
  { item_number: '143', item_name: 'Soap Dish Small', department: 'Bathroom Accessories', price: 400, qty: null },
  { item_number: '144', item_name: 'Soap Dish Big', department: 'Bathroom Accessories', price: 700, qty: null },
  { item_number: '145', item_name: 'Soap Dish Plastic', department: 'Bathroom Accessories', price: 250, qty: null },
  { item_number: '146', item_name: 'Tissue Holder (White)', department: 'Bathroom Accessories', price: 500, qty: null },
  { item_number: '147', item_name: 'Tissue Holder (ring)', department: 'Bathroom Accessories', price: 500, qty: null },
  { item_number: '148', item_name: 'Tissue Holder (Big)', department: 'Bathroom Accessories', price: 1000, qty: null },
  { item_number: '149', item_name: 'Tissue Holder (Small) A', department: 'Bathroom Accessories', price: 500, qty: null },
  { item_number: '150', item_name: 'Tissue Holder (Small) B', department: 'Bathroom Accessories', price: 500, qty: null },
  { item_number: '151', item_name: 'Corner Unit', department: 'Kitchen Accessories', price: 1000, qty: null },
  { item_number: '152', item_name: 'Kitchen Towel Holder', department: 'Kitchen Accessories', price: 900, qty: null },
  { item_number: '153', item_name: 'Toothbrush Holder normal', department: 'Kitchen Accessories', price: null, qty: null },
  { item_number: '154', item_name: 'Chrome Brackets 1\'', department: 'Brackets', price: 100, qty: null },
  { item_number: '155', item_name: 'Chrome Brackets 3/4\'', department: 'Brackets', price: 100, qty: null },
  { item_number: '156', item_name: 'Chrome Pipe 1\'', department: 'Pipe', price: 600, qty: null },
  { item_number: '157', item_name: 'Chrome Pipe 3/4\'', department: 'Pipe', price: 550, qty: null },
  { item_number: '158', item_name: 'Proffessional 250ml', department: 'Glue', price: 250, qty: null },
  { item_number: '159', item_name: 'Proffessional 500ml', department: 'Glue', price: 450, qty: null },
  { item_number: '160', item_name: 'Proffessional 1L', department: 'Glue', price: 800, qty: null },
  { item_number: '161', item_name: 'Chemsal 250ml', department: 'Glue', price: 200, qty: null },
  { item_number: '162', item_name: 'Chemsal 500ml', department: 'Glue', price: 350, qty: null },
  { item_number: '163', item_name: 'Chemsal 1L', department: 'Glue', price: 500, qty: null },
  { item_number: '164', item_name: 'Shower', department: 'Shower', price: 1500, qty: null },
  { item_number: '165', item_name: '1Pct Rubbers', department: 'Rubber', price: 100, qty: null },
  { item_number: '166', item_name: 'Testor Dupro', department: 'Testor', price: 100, qty: null },
  { item_number: '167', item_name: 'KZQ Testor', department: 'Testor', price: 100, qty: null },
  { item_number: '168', item_name: 'Dupro Testor (B)', department: 'Testor', price: 130, qty: null },
  { item_number: '169', item_name: 'FX Plier', department: 'Pliers', price: 300, qty: null },
  { item_number: '170', item_name: 'FX Plier Big', department: 'Pliers', price: 350, qty: null },
  { item_number: '171', item_name: 'Ordinary Pliers', department: 'Pliers', price: 250, qty: null },
  { item_number: '172', item_name: 'Cable Clips', department: '', price: 100, qty: null },
  { item_number: '173', item_name: 'Dead Lock Hanzil', department: '', price: 1800, qty: null },
  { item_number: '174', item_name: 'Dead Lock Moment', department: '', price: 1500, qty: null },
  { item_number: '175', item_name: 'Dead Lock Hanzil Knob', department: '', price: 1600, qty: null },
  { item_number: '176', item_name: 'Dead Lock Moment Knob', department: '', price: 1500, qty: null },
  { item_number: '177', item_name: 'Dead Lock Hanzil (Short)', department: '', price: 1200, qty: null },
  { item_number: '178', item_name: 'Dead Lock Tri-Circle Short', department: '', price: 1500, qty: null },
  { item_number: '179', item_name: 'Dead Lock Union Short', department: '', price: 1500, qty: null },
  { item_number: '180', item_name: '2Kg Crack Plier', department: '', price: 750, qty: null },
  { item_number: '181', item_name: '500gm Dr Fixit', department: '', price: 250, qty: null },
  { item_number: '182', item_name: '1Kg Dr Fixit', department: '', price: 650, qty: null },
  { item_number: '183', item_name: '5ml Gladiator', department: '', price: 850, qty: null },
  { item_number: '184', item_name: '1L Gladiator', department: '', price: 1500, qty: null },
  { item_number: '185', item_name: '1L Conta', department: '', price: 950, qty: null },
  { item_number: '186', item_name: '500ml Conta', department: '', price: 550, qty: null },
  { item_number: '187', item_name: '250ml Conta', department: '', price: 350, qty: null },
  { item_number: '188', item_name: '100ml Conta', department: '', price: 200, qty: null },
  { item_number: '189', item_name: 'Wood screw 2\'', department: '', price: 250, qty: null },
  { item_number: '190', item_name: 'Wood screw 1\'', department: '', price: 200, qty: null },
  { item_number: '191', item_name: 'Wood screw 3\'', department: '', price: 500, qty: null },
  { item_number: '192', item_name: 'Malpha Hinges Hydraulic', department: '', price: 150, qty: null },
  { item_number: '193', item_name: 'Malpha Non Hydraulic', department: '', price: 100, qty: null },
  { item_number: '194', item_name: 'Butterfly Hinge', department: '', price: 350, qty: null },
  { item_number: '195', item_name: 'Castor wheel Black', department: '', price: 300, qty: null },
  { item_number: '196', item_name: 'Castor wheel Black Brake', department: '', price: 350, qty: null },
  { item_number: '197', item_name: 'Castor wheel orange', department: '', price: 250, qty: null },
  { item_number: '198', item_name: 'Castor wheel orange Brakes', department: '', price: 300, qty: null },
  { item_number: '199', item_name: 'Kamba 3ply', department: '', price: 100, qty: null },
  { item_number: '200', item_name: 'Wall Plug 6MM', department: '', price: 200, qty: null },
  { item_number: '201', item_name: 'Wall Plug 8MM', department: '', price: 200, qty: null },
  { item_number: '202', item_name: 'Wall Plug 10MM', department: '', price: 200, qty: null },
  { item_number: '203', item_name: 'Wall Plug 12MM', department: '', price: 250, qty: null },
  { item_number: '204', item_name: 'Spirit Level', department: '', price: 150, qty: null },
  { item_number: '205', item_name: 'Scapel 1/2', department: '', price: 100, qty: null },
  { item_number: '206', item_name: 'Scapel 3/4', department: '', price: 150, qty: null },
  { item_number: '207', item_name: 'Sqaure B', department: '', price: 120, qty: null },
  { item_number: '208', item_name: 'Sqaure S', department: '', price: 100, qty: null },
  { item_number: '209', item_name: 'Door Stopper', department: '', price: 100, qty: null },
  { item_number: '210', item_name: 'Chisel 1/2\'', department: '', price: 250, qty: null },
  { item_number: '211', item_name: 'Chisel 3/4\'', department: '', price: 300, qty: null },
  { item_number: '212', item_name: 'Glass Cutter', department: '', price: 150, qty: null },
  { item_number: '213', item_name: 'Corner Tape', department: '', price: 1200, qty: null },
  { item_number: '214', item_name: 'gypsum screw  1\'\'', department: '', price: 800, qty: null },
  { item_number: '215', item_name: 'mdf screw *50', department: '', price: 350, qty: null },
  { item_number: '216', item_name: 'Steel Nails', department: '', price: 250, qty: null },
  { item_number: '217', item_name: 'Fibre Tape', department: '', price: 450, qty: null },
  { item_number: '218', item_name: 'Spray Paint', department: '', price: 250, qty: null },
  { item_number: '219', item_name: 'Drawer Rails', department: '', price: 380, qty: null },
  { item_number: '220', item_name: 'Tuck Nails', department: '', price: 150, qty: null },
  { item_number: '221', item_name: 'Brushes 1\'\'', department: '', price: 100, qty: null },
  { item_number: '222', item_name: 'Handles', department: '', price: 100, qty: null },
  { item_number: '223', item_name: 'Abroslock', department: '', price: 1100, qty: null },
  { item_number: '224', item_name: 'Boros Lock', department: '', price: 1100, qty: null },
  { item_number: '225', item_name: 'Moment Lock', department: '', price: 1100, qty: null },
  { item_number: '226', item_name: 'Union Lock', department: '', price: 1800, qty: null },
  { item_number: '227', item_name: 'Abby Lock', department: '', price: 1500, qty: null },
  { item_number: '228', item_name: 'Hanzil Lock', department: '', price: 3500, qty: null },
  { item_number: '229', item_name: 'Lincy Lock', department: '', price: 1200, qty: null },
  { item_number: '230', item_name: 'Konji (In) (Out)', department: '', price: 100, qty: null },
  { item_number: '231', item_name: 'Jua Kali Konji (In) (Out)', department: '', price: 100, qty: null },
  { item_number: '232', item_name: 'Ordinary Hinges', department: '', price: 50, qty: null },
  { item_number: '233', item_name: 'Wall Pass', department: '', price: 10, qty: null },
  { item_number: '234', item_name: 'shelf Brackets', department: '', price: 100, qty: null },
  { item_number: '235', item_name: 'PV Foam', department: '', price: 1100, qty: null },
  { item_number: '236', item_name: 'Roller', department: '', price: 350, qty: null },
  { item_number: '237', item_name: 'Sand Paper one roll', department: '', price: 40, qty: null },
  { item_number: '238', item_name: 'Silicon Hightech', department: '', price: 350, qty: null },
  { item_number: '239', item_name: 'Silicon GP', department: '', price: 300, qty: null },
  { item_number: '240', item_name: 'Tower Bolt', department: '', price: 150, qty: null },
  { item_number: '241', item_name: 'Drawer Lock', department: '', price: 100, qty: null },
  { item_number: '242', item_name: 'Glass Cutter', department: '', price: 150, qty: null },
  { item_number: '243', item_name: 'Magnetic Nut Setters', department: '', price: 750, qty: null },
  { item_number: '244', item_name: 'Diamond Cutting Disc Big Size', department: '', price: 850, qty: null },
  { item_number: '245', item_name: 'Diamond Cutting Disc Small Size', department: '', price: 400, qty: null },
  { item_number: '246', item_name: 'Cutting Disc', department: '', price: 850, qty: null },
  { item_number: '247', item_name: 'Dr Fixit', department: '', price: 650, qty: null },
  { item_number: '248', item_name: 'C.P Sink Mixer', department: '', price: 1900, qty: null },
  { item_number: '249', item_name: 'C.P Wall Tap', department: '', price: 950, qty: null },
  { item_number: '250', item_name: 'Long Kneck Wall Tap', department: '', price: 600, qty: null },
  { item_number: '251', item_name: 'Wall Tap with Star Handle', department: '', price: 600, qty: null },
  { item_number: '252', item_name: 'Pillar Tap With Star Handle', department: '', price: 600, qty: null },
  { item_number: '253', item_name: 'Pillar Tap Self Closing', department: '', price: 1300, qty: null },
  { item_number: '254', item_name: 'Pegra Bond 200gms', department: '', price: null, qty: null },
  { item_number: '255', item_name: 'Gate Valve', department: '', price: 300, qty: null },
  { item_number: '256', item_name: 'Water Tap', department: '', price: 650, qty: null },
  { item_number: '257', item_name: 'Hacksaw Frame', department: '', price: 400, qty: null },
  { item_number: '258', item_name: 'Saw 18\'', department: '', price: 300, qty: null },
  { item_number: '259', item_name: 'Saw 16\'', department: '', price: 250, qty: null },
  { item_number: '260', item_name: 'Hacksaw Blade', department: '', price: 100, qty: null },
  { item_number: '261', item_name: 'JK File', department: '', price: 100, qty: null },
  { item_number: '262', item_name: 'Panga', department: '', price: 250, qty: null },
  { item_number: '263', item_name: 'Hummer', department: '', price: 300, qty: null },
  { item_number: '264', item_name: 'Wirebrush', department: '', price: 100, qty: null },
  { item_number: '265', item_name: 'Partex Wiid glue', department: '', price: 800, qty: null },
  { item_number: '266', item_name: 'Curtain Holders', department: '', price: 200, qty: null },
  { item_number: '267', item_name: 'Window Stay', department: '', price: 100, qty: null },
  { item_number: '268', item_name: 'Drawer Knob', department: '', price: 50, qty: null },
  { item_number: '269', item_name: 'Silicon Gvn', department: '', price: 450, qty: null },
  { item_number: '270', item_name: 'Brade', department: '', price: 100, qty: null },
  { item_number: '271', item_name: 'Wood Presevative 1Kg', department: '', price: 3500, qty: null },
  { item_number: '272', item_name: 'Kamba 1000Mtrs', department: '', price: 700, qty: null },
  { item_number: '273', item_name: 'Kamba 500Mtrs', department: '', price: 350, qty: null },
  { item_number: '274', item_name: 'Plastic Ventilation', department: '', price: 130, qty: null },
  { item_number: '275', item_name: 'Wood Presevative 20L', department: '', price: 700, qty: null },
  { item_number: '276', item_name: 'Wood Preservative 5L', department: '', price: 350, qty: null },
  { item_number: '277', item_name: 'Tri-Circle 262', department: '', price: 280, qty: null },
  { item_number: '278', item_name: 'Tri-Circle 263', department: '', price: 350, qty: null },
  { item_number: '279', item_name: 'Tri-Circle 264', department: '', price: 400, qty: null },
  { item_number: '280', item_name: 'Tri-Circle 265', department: '', price: 650, qty: null },
  { item_number: '281', item_name: 'Tri-Circle 266', department: '', price: 900, qty: null },
  { item_number: '282', item_name: 'Tri-Cyclic 262', department: '', price: 100, qty: null },
  { item_number: '283', item_name: 'Tri-Cyclic 263', department: '', price: 150, qty: null },
  { item_number: '284', item_name: 'Tri-Cyclic 264', department: '', price: 200, qty: null },
  { item_number: '285', item_name: 'Tri-Cyclic 265', department: '', price: 250, qty: null },
  { item_number: '286', item_name: 'Tri-Cyclic 266', department: '', price: 350, qty: null },
  { item_number: '287', item_name: 'Cica Padlock 70mm', department: '', price: 800, qty: null },
  { item_number: '288', item_name: 'Cica Padlock 50mm', department: '', price: 650, qty: null },
  { item_number: '289', item_name: 'Cica Padlock 40mm', department: '', price: 450, qty: null },
  { item_number: '290', item_name: 'Stelier 80mm', department: '', price: 650, qty: null },
  { item_number: '291', item_name: 'Stelier 70mm', department: '', price: 600, qty: null },
  { item_number: '292', item_name: 'Stelier 60mm', department: '', price: 500, qty: null },
  { item_number: '293', item_name: 'Stelier 50mm', department: '', price: 350, qty: null },
  { item_number: '294', item_name: 'Stelier  40mm', department: '', price: 300, qty: null },
  { item_number: '295', item_name: 'Rollisen 70mm', department: '', price: 500, qty: null },
  { item_number: '296', item_name: 'Rollisen 60mm', department: '', price: 450, qty: null },
  { item_number: '297', item_name: 'Rollisen 50mm', department: '', price: 350, qty: null },
  { item_number: '298', item_name: 'Rollisen 40mm', department: '', price: 250, qty: null },
  { item_number: '299', item_name: 'Auddy 70mm', department: '', price: 500, qty: null },
  { item_number: '300', item_name: 'Auddy 60mm', department: '', price: 450, qty: null },
  { item_number: '301', item_name: 'Auddy 40mm', department: '', price: 350, qty: null },
  { item_number: '302', item_name: 'Mindy Big', department: '', price: 900, qty: null },
  { item_number: '303', item_name: 'Mindy medium', department: '', price: 650, qty: null },
  { item_number: '304', item_name: 'Mindy Small', department: '', price: 550, qty: null },
  { item_number: '305', item_name: 'Buckler Lock Big', department: '', price: 1000, qty: null },
  { item_number: '306', item_name: 'Buckler Lock Small', department: '', price: 900, qty: null },
  { item_number: '307', item_name: 'Rickdoor 70mm', department: '', price: 650, qty: null },
  { item_number: '308', item_name: 'Rickdoor 55mm', department: '', price: 500, qty: null },
  { item_number: '309', item_name: 'Mocca 70mm', department: '', price: 450, qty: null },
  { item_number: '310', item_name: 'Mocca 50mm', department: '', price: 320, qty: null },
  { item_number: '311', item_name: 'Alarm Lock', department: '', price: 1000, qty: null },
  { item_number: '312', item_name: 'Rubin Lock', department: '', price: 600, qty: null },
  { item_number: '313', item_name: 'Tri-Circle 50mm', department: '', price: 550, qty: null },
  { item_number: '314', item_name: 'Hada Filler', department: '', price: 900, qty: null },
  { item_number: '315', item_name: 'Sahara', department: '', price: 700, qty: null },
  { item_number: '316', item_name: 'Duracoat skim coat', department: '', price: 1350, qty: null },
  { item_number: '317', item_name: 'Drawer locks', department: '', price: 100, qty: null },
  { item_number: '318', item_name: 'Tower bolt 3\'\'', department: '', price: 100, qty: null },
  { item_number: '319', item_name: 'Tower bolt    4\'\'', department: '', price: 130, qty: null },
  { item_number: '320', item_name: 'brushes 2\'\'', department: '', price: 130, qty: null },
  { item_number: '321', item_name: 'Brushes 3\'\'', department: '', price: 150, qty: null },
  { item_number: '322', item_name: 'Brushes 4\'\'', department: '', price: 200, qty: null },
  { item_number: '323', item_name: 'Brushea 5\'\'', department: '', price: 250, qty: null },
  { item_number: '324', item_name: 'Brushes 6\'\'', department: '', price: 300, qty: null },
  { item_number: '325', item_name: 'Steel  nails  2\'\'', department: '', price: null, qty: null },
  { item_number: '326', item_name: 'Steel nails 2.5\'\'', department: '', price: null, qty: null },
  { item_number: '327', item_name: 'Steel nails 3\'\'', department: '', price: null, qty: null },
  { item_number: '328', item_name: 'Steel nails 4\'\'', department: '', price: null, qty: null },
  { item_number: '329', item_name: 'Steel nails 1.5\'\'', department: '', price: null, qty: null },
  { item_number: '330', item_name: 'Steel nails 1\'\'', department: '', price: null, qty: null },
  { item_number: '331', item_name: '', department: '', price: null, qty: null },
  { item_number: '332', item_name: '', department: '', price: null, qty: null },
  { item_number: '333', item_name: '', department: '', price: null, qty: null },
  { item_number: '335', item_name: '', department: '', price: null, qty: null }
];

// Utility functions
function formatPrice(price) {
  if (price === null || price === undefined || isNaN(price)) return 'N/A';
  return 'KSh ' + Number(price).toLocaleString();
}

function getStockStatus(qty) {
  if (qty === null || qty === undefined || qty === 0) return 'out-of-stock';
  if (qty <= 5) return 'low-stock';
  return 'in-stock';
}

function getStockText(qty) {
  if (qty === null || qty === undefined) return 'Out of Stock';
  if (qty === 0) return 'Out of Stock';
  if (qty <= 5) return `Low Stock (${qty})`;
  return `In Stock (${qty})`;
}

// Populate department filter
function populateDepartments(items) {
  const departments = new Set();
  items.forEach(item => {
    if (item.department && item.department.trim() !== '') {
      departments.add(item.department);
    }
  });
  
  const select = document.getElementById('departmentFilter');
  Array.from(departments).sort().forEach(dept => {
    const option = document.createElement('option');
    option.value = dept;
    option.textContent = dept;
    select.appendChild(option);
  });
}

// Calculate total value of displayed items
function calculateTotalValue(items) {
  return items.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 0;
    return total + (price * qty);
  }, 0);
}

// Count unique departments in displayed items
function countDepartments(items) {
  const departments = new Set();
  items.forEach(item => {
    if (item.department && item.department.trim() !== '') {
      departments.add(item.department);
    }
  });
  return departments.size;
}

// Render inventory table
function renderInventory(items) {
  const tbody = document.getElementById('inventoryBody');
  const countEl = document.getElementById('count');
  const totalValueEl = document.getElementById('totalValue');
  const departmentCountEl = document.getElementById('departmentCount');
  
  countEl.textContent = items.length;
  totalValueEl.textContent = formatPrice(calculateTotalValue(items));
  departmentCountEl.textContent = countDepartments(items);
  
  if (items.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="empty-state">
          <h3>No items found</h3>
          <p>Try adjusting your search terms or filters</p>
        </td>
      </tr>
    `;
    return;
  }
  
  tbody.innerHTML = '';
  
  items.forEach(item => {
    const row = document.createElement('tr');
    
    const stockStatus = getStockStatus(item.qty);
    const stockText = getStockText(item.qty);
    
    row.innerHTML = `
      <td>${item.item_number || 'N/A'}</td>
      <td><span class="item-name">${item.item_name || 'Unnamed Item'}</span></td>
      <td><span class="department">${item.department || 'General'}</span></td>
      <td><span class="price">${formatPrice(item.price)}</span></td>
      <td><span class="qty">${item.qty !== null ? item.qty : 'N/A'}</span></td>
      <td><span class="status status-${stockStatus}">${stockText}</span></td>
    `;
    
    tbody.appendChild(row);
  });
}

// Search and filter functionality
function performSearch() {
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  const department = document.getElementById('departmentFilter').value;
  const stockFilter = document.getElementById('stockFilter').value;
  
  let filteredItems = ITEMS.filter(item => {
    // Department filter
    if (department && item.department !== department) return false;
    
    // Stock status filter
    if (stockFilter) {
      const status = getStockStatus(item.qty);
      if (status !== stockFilter) return false;
    }
    
    // Search query
    if (!query) return true;
    
    const searchFields = [
      item.item_name || '',
      String(item.item_number || ''),
      item.department || ''
    ].join(' ').toLowerCase();
    
    return searchFields.includes(query);
  });
  
  renderInventory(filteredItems);
}

// Sorting functionality
function setupSorting() {
  const headers = document.querySelectorAll('th[data-sort]');
  let currentSort = {
    key: null,
    direction: 'asc'
  };
  
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const sortKey = header.getAttribute('data-sort');
      
      // Update current sort
      if (currentSort.key === sortKey) {
        currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        currentSort.key = sortKey;
        currentSort.direction = 'asc';
      }
      
      // Update UI
      headers.forEach(h => {
        h.querySelector('i').className = 'fas fa-sort';
      });
      
      header.querySelector('i').className = `fas fa-sort-${currentSort.direction === 'asc' ? 'up' : 'down'}`;
      
      // Sort items
      let filteredItems = ITEMS.filter(item => {
        const query = document.getElementById('searchInput').value.trim().toLowerCase();
        const department = document.getElementById('departmentFilter').value;
        const stockFilter = document.getElementById('stockFilter').value;
        
        // Department filter
        if (department && item.department !== department) return false;
        
        // Stock status filter
        if (stockFilter) {
          const status = getStockStatus(item.qty);
          if (status !== stockFilter) return false;
        }
        
        // Search query
        if (!query) return true;
        
        const searchFields = [
          item.item_name || '',
          String(item.item_number || ''),
          item.department || ''
        ].join(' ').toLowerCase();
        
        return searchFields.includes(query);
      });
      
      filteredItems.sort((a, b) => {
        let valueA = a[currentSort.key];
        let valueB = b[currentSort.key];
        
        // Handle null/undefined values
        if (valueA === null || valueA === undefined) valueA = '';
        if (valueB === null || valueB === undefined) valueB = '';
        
        // Handle numeric values
        if (currentSort.key === 'price' || currentSort.key === 'qty') {
          valueA = Number(valueA) || 0;
          valueB = Number(valueB) || 0;
        }
        
        // Handle string values
        if (typeof valueA === 'string') valueA = valueA.toLowerCase();
        if (typeof valueB === 'string') valueB = valueB.toLowerCase();
        
        if (valueA < valueB) return currentSort.direction === 'asc' ? -1 : 1;
        if (valueA > valueB) return currentSort.direction === 'asc' ? 1 : -1;
        return 0;
      });
      
      renderInventory(filteredItems);
    });
  });
}

// Debounce function for search input
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  populateDepartments(ITEMS);
  renderInventory(ITEMS);
  setupSorting();
  
  // Event listeners
  document.getElementById('searchInput').addEventListener('input', debounce(performSearch, 200));
  document.getElementById('departmentFilter').addEventListener('change', performSearch);
  document.getElementById('stockFilter').addEventListener('change', performSearch);
  
  // Add some interactive features
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && e.target.tagName !== 'INPUT') {
      e.preventDefault();
      document.getElementById('searchInput').focus();
    }
  });
  
  console.log('Lee Timber Yard inventory system loaded successfully!');
  console.log(`Total items in inventory: ${ITEMS.length}`);
});