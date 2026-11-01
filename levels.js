// 场景：q 题目, sky 天空色, bg 背景(day/night/sea/snow), ground 地面, place 地点, problem 问题, fx 特效, after 解决后
// answer 正确的车, avoid 不当作错误选项的车（避免出现两个合理答案）, high 问题在高处, win 成功时的话
const S = (q, sky, ground, place, problem, fx, after, answer, win, extra = {}) =>
  ({ q, sky, ground, place, problem, fx, after, answer, win, ...extra });

const SCENES = [
  // 消防车
  S('大楼着火啦！谁来帮忙？', '#ffccbc', 'road', 'tower', 'fire', 'water', 'happy', 'fire', '消防车喷水，把火扑灭啦！', { avoid: ['helicopter', 'sprinkler'] }),
  S('小猫爬到树上下不来了，谁来救它？', '#e8f5e9', 'grass', 'tree', 'cat', 'sparkle', 'catHappy', 'fire', '消防车升起云梯，救下了小猫！', { high: true, avoid: ['helicopter', 'crane', 'forklift'] }),
  S('森林着火啦！谁来灭火？', '#ffe0b2', 'grass', 'forest', 'fire', 'water', 'heart', 'fire', '消防车来啦，森林的火灭了！', { avoid: ['helicopter', 'sprinkler', 'airplane'] }),
  // 救护车
  S('有人受伤了！谁来帮忙？', '#e1f5fe', 'road', 'house', 'hurt', 'medic', 'healed', 'ambulance', '救护车来了，医生治好了伤！', { avoid: ['helicopter', 'taxi'] }),
  S('奶奶生病了，谁送她去医院？', '#f3e5f5', 'road', 'house', 'grandma', 'medic', 'grandmaHappy', 'ambulance', '救护车把奶奶送到医院，奶奶好起来啦！', { avoid: ['helicopter', 'taxi', 'citybus'] }),
  // 警车
  S('有小偷！谁来抓他？', '#d1c4e9', 'road', 'bank', 'thief', 'siren', 'cop', 'police', '警车来了，抓住小偷啦！', { avoid: ['motorbike'] }),
  S('商店被偷了东西，谁来帮忙？', '#e8eaf6', 'road', 'shop', 'thief', 'siren', 'cop', 'police', '警察叔叔抓住了小偷！', { avoid: ['motorbike'] }),
  S('小朋友走丢了，谁来帮他找妈妈？', '#fff3e0', 'road', 'lights', 'lost', 'siren', 'happy', 'police', '警车帮小朋友找到了妈妈！', { avoid: ['helicopter', 'taxi', 'citybus', 'bus'] }),
  // 校车 / 公交车 / 出租车
  S('小朋友要上学，坐什么车？', '#fff9c4', 'road', 'school', 'waiting', 'sparkle', 'heart', 'bus', '校车接小朋友去上学啦！', { avoid: ['taxi', 'bike', 'citybus', 'motorbike'] }),
  S('放学啦，小朋友坐什么车回家？', '#ffe0b2', 'road', 'school', 'waiting', 'sparkle', 'heart', 'bus', '校车送小朋友平平安安回家！', { avoid: ['taxi', 'bike', 'citybus', 'motorbike', 'rv'] }),
  S('好多人在公交站等车，谁来接他们？', '#e0f2f1', 'road', 'stop', 'crowd', 'sparkle', 'heart', 'citybus', '公交车来了，大家排队上车！', { avoid: ['bus', 'taxi', 'train', 'rv'] }),
  S('爷爷奶奶要去菜市场，坐什么车？', '#f1f8e9', 'road', 'stop', 'oldie', 'sparkle', 'heart', 'citybus', '坐公交车，到菜市场啦！', { avoid: ['bus', 'taxi', 'bike', 'motorbike', 'rv'] }),
  S('阿姨在路边招手，谁来接她？', '#fce4ec', 'road', 'shop', 'lady', 'sparkle', 'heart', 'taxi', '出租车停下来，接上了阿姨！', { avoid: ['citybus', 'bus', 'motorbike'] }),
  S('爸爸要赶飞机，谁送他去机场？', '#e3f2fd', 'road', 'house', 'traveler', 'sparkle', 'heart', 'taxi', '出租车把爸爸送到了机场！', { avoid: ['citybus', 'bus', 'train', 'airplane', 'motorbike', 'rv', 'helicopter'] }),
  // 农场
  S('春天到了，谁来帮忙耕地？', '#f1f8e9', 'soil', 'barn', 'seeds', 'sparkle', 'sprout', 'tractor', '拖拉机耕好了地，小苗长出来啦！', { avoid: ['harvester', 'bulldozer', 'excavator'] }),
  S('麦子熟了，谁来收麦子？', '#fff3e0', 'grass', 'barn', 'wheat', 'sparkle', 'bread', 'harvester', '收割机收好了麦子，可以做面包啦！', { avoid: ['tractor'] }),
  // 运输
  S('要搬很多箱子，用什么车？', '#eceff1', 'road', 'factory', 'boxes', 'sparkle', 'check', 'truck', '大货车把箱子运走啦！', { avoid: ['train', 'boat', 'forklift', 'mail', 'dump', 'airplane'] }),
  S('要搬家啦，东西用什么车运？', '#fff8e1', 'road', 'house', 'boxes', 'sparkle', 'heart', 'truck', '货车帮忙搬好家啦！', { avoid: ['dump', 'train', 'rv', 'forklift', 'mail', 'boat'] }),
  S('仓库里的货物要搬上架子，用什么车？', '#eceff1', 'road', 'warehouse', 'boxes', 'sparkle', 'check', 'forklift', '叉车把货物整整齐齐放上了架子！', { avoid: ['truck', 'crane'] }),
  S('集装箱要搬到船上，谁来吊？', '#e1f5fe', 'road', 'port', 'container', 'sparkle', 'check', 'crane', '吊车把集装箱吊上了船！', { avoid: ['forklift', 'helicopter', 'truck'] }),
  S('加油站没有油了，谁来送油？', '#fff3e0', 'road', 'gas', 'pump', 'sparkle', 'check', 'tanker', '油罐车送来了油，加油站又能加油啦！', { avoid: ['truck', 'sprinkler'] }),
  S('要寄一封信给奶奶，谁来送？', '#e8f5e9', 'road', 'house', 'letter', 'sparkle', 'heart', 'mail', '邮政车把信送到了奶奶家！', { avoid: ['truck', 'motorbike', 'bike', 'airplane', 'train'] }),
  S('肚子饿了，点的外卖谁来送？', '#fff8e1', 'road', 'house', 'hungry', 'sparkle', 'food', 'motorbike', '外卖小哥骑摩托车送来了热乎乎的饭！', { avoid: ['bike', 'taxi', 'truck', 'mail'] }),
  // 工地
  S('工地要挖个大坑，谁来挖？', '#fff8e1', 'grass', 'site', 'dirt', 'sparkle', 'check', 'excavator', '挖掘机挖呀挖，挖好啦！', { avoid: ['bulldozer'] }),
  S('盖房子需要水泥，谁送来？', '#e0f2f1', 'road', 'site', 'worker', 'sparkle', 'builder', 'mixer', '水泥车转呀转，送来了水泥！', { avoid: ['truck', 'dump'] }),
  S('工地上需要好多沙子，谁来运？', '#fffde7', 'road', 'site', 'worker', 'sparkle', 'sand', 'dump', '翻斗车把沙子倒下来，哗啦啦！', { avoid: ['truck', 'mixer', 'excavator'] }),
  S('马路上有个大坑，谁运土来填？', '#e3f2fd', 'road', 'lights', 'hole', 'sparkle', 'check', 'dump', '翻斗车运来土，把坑填平啦！', { avoid: ['excavator', 'bulldozer', 'truck', 'roller'] }),
  S('要把钢材吊到高楼上，用什么车？', '#e8eaf6', 'road', 'site', 'beams', 'sparkle', 'check', 'crane', '吊车把钢材高高吊起来啦！', { avoid: ['helicopter', 'forklift', 'truck'] }),
  S('地上好多大石头，谁来推走？', '#efebe9', 'soil', 'site', 'rocks', 'sparkle', 'check', 'bulldozer', '推土机把石头推得干干净净！', { avoid: ['excavator', 'dump', 'tractor', 'roller', 'snowplow'] }),
  S('新马路坑坑洼洼，谁来压平？', '#f5f5f5', 'road', 'lights', 'gravel', 'sparkle', 'check', 'roller', '压路机压呀压，马路平平的！', { avoid: ['bulldozer'] }),
  // 城市清洁
  S('垃圾太多啦，谁来运走？', '#f1f8e9', 'road', 'park', 'trash', 'sparkle', 'check', 'garbage', '垃圾车把垃圾运走，干干净净！', { avoid: ['truck', 'sweeper', 'dump'] }),
  S('马路上好多落叶，谁来扫干净？', '#fff3e0', 'road', 'park', 'leaves', 'sparkle', 'check', 'sweeper', '扫地车扫呀扫，马路干净啦！', { avoid: ['garbage', 'sprinkler'] }),
  S('天太热了，马路上好多灰尘，谁来洒水？', '#fff8e1', 'road', 'city', 'dust', 'water', 'check', 'sprinkler', '洒水车洒水，马路又凉快又干净！', { avoid: ['fire', 'sweeper'] }),
  S('花园里的花渴了，谁来浇水？', '#f1f8e9', 'grass', 'garden', 'wilt', 'water', 'flower', 'sprinkler', '洒水车来浇水，花儿笑啦！', { avoid: ['fire'] }),
  S('下大雪了，路被雪堵住了，谁来铲雪？', '#e3f2fd', 'snow', 'house', 'snowpile', 'sparkle', 'check', 'snowplow', '铲雪车把雪铲开，路通啦！', { bg: 'snow', avoid: ['bulldozer', 'excavator', 'sweeper'] }),
  // 修车 / 停车
  S('小汽车坏了，谁来帮它？', '#e3f2fd', 'road', 'garage', 'broken', 'sparkle', 'check', 'tow', '拖车把小汽车拖去修好啦！', { avoid: ['crane'] }),
  S('有辆车停错了地方，挡住了路，谁来拖走？', '#ede7f6', 'road', 'shop', 'parked', 'sparkle', 'check', 'tow', '拖车把车拖走，路通啦！', { avoid: ['police', 'crane', 'forklift'] }),
  // 好玩的
  S('赛车比赛开始啦！谁去比赛？', '#fce4ec', 'road', 'finish', 'flag', 'sparkle', 'trophy', 'race', '赛车跑得最快，得了第一名！', { avoid: ['motorbike'] }),
  S('天好热，小朋友想吃冰淇淋，谁来卖？', '#fff9c4', 'road', 'park', 'hot', 'sparkle', 'icecream', 'icecream', '冰淇淋车来啦，叮叮当，好甜好凉！'),
  S('一家人要去野外露营，开什么车？', '#e8f5e9', 'grass', 'forest', 'family', 'sparkle', 'tent', 'rv', '房车开到野外，可以在车里睡觉啦！', { avoid: ['bus', 'citybus', 'taxi', 'truck'] }),
  S('周末去公园锻炼身体，骑什么？', '#e8f5e9', 'road', 'park', 'biker', 'sparkle', 'heart', 'bike', '骑自行车，又健康又开心！', { avoid: ['motorbike'] }),
  // 水上 / 水下
  S('要去海上的小岛，坐什么？', '#e0f7fa', 'water', 'island', 'traveler', 'sparkle', 'heart', 'boat', '坐轮船，到小岛啦！', { avoid: ['helicopter', 'airplane', 'submarine'] }),
  S('渔夫伯伯要出海打鱼，坐什么？', '#e1f5fe', 'water', 'lighthouse', 'fisher', 'sparkle', 'fish', 'boat', '轮船出海，打到了好多鱼！', { avoid: ['submarine'] }),
  S('想看深海里的小鱼，坐什么？', '#4fc3f7', 'sand', 'coral', 'diver', 'sparkle', 'fish', 'submarine', '潜水艇潜到海底，看到了小鱼！', { bg: 'sea', avoid: ['boat'] }),
  // 天上
  S('想去月亮上看看，坐什么？', '#3f51b5', 'pad', 'launch', 'dreamer', 'sparkle', 'star', 'rocket', '火箭飞呀飞，飞上月亮啦！', { bg: 'night' }),
  S('要把卫星送上太空，用什么？', '#283593', 'pad', 'launch', 'satellite', 'sparkle', 'star', 'rocket', '火箭把卫星送上了太空！', { bg: 'night', high: true, avoid: ['airplane', 'balloon'] }),
  S('有人在山上迷路了，谁去救他？', '#e8f5e9', 'grass', 'mountain', 'lost', 'medic', 'happy', 'helicopter', '直升机飞过去，救到他啦！', { avoid: ['ambulance', 'police', 'airplane', 'balloon'] }),
  S('要去很远很远的国家，坐什么？', '#e3f2fd', 'road', 'airport', 'traveler', 'sparkle', 'heart', 'airplane', '飞机飞上蓝天，出发去旅行！', { avoid: ['rocket', 'helicopter', 'boat', 'train', 'balloon'] }),
  S('想飞到天上慢慢看风景，坐什么？', '#e1f5fe', 'grass', 'mountain', 'waiting', 'sparkle', 'heart', 'balloon', '热气球慢慢飞，风景真美！', { avoid: ['helicopter', 'airplane', 'rocket'] }),
  // 铁路
  S('要去很远的城市，坐什么？', '#ede7f6', 'rail', 'station', 'traveler', 'sparkle', 'heart', 'train', '坐上火车，呜呜呜出发啦！', { avoid: ['bus', 'citybus', 'taxi', 'helicopter', 'rocket', 'airplane', 'rv'] }),
];
