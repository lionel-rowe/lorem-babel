import type { LoremBabelConfig } from '../mod.ts'

/**
 * @module
 * Config used with LoremBabel to generate nonsense placeholder text in `zh` locale.
 */

/** LoremBabel configuration for `zh` locale */
const config: LoremBabelConfig = {
	'locale': 'zh',
	'sentenceSeparator': '',
	'wordSeparators': [
		{ 'weight': 5, 'separator': '' },
		{ 'weight': 0.075, 'separator': '，' },
		{ 'weight': 0.0005, 'separator': '：' },
		{ 'weight': 0.001, 'separator': '、' },
	],
	'sentenceWrappers': [
		{ 'weight': 1, 'end': '。' },
		{ 'weight': 0.01, 'end': '？' },
		{ 'weight': 0.005, 'end': '！' },
	],
	'vocabulary': [
		{ 'word': '的', 'weight': 199 },
		{ 'word': '字符', 'weight': 79 },
		{ 'word': '编码', 'weight': 56 },
		{ 'word': '在', 'weight': 45 },
		{ 'word': '使用', 'weight': 36 },
		{ 'word': '和', 'weight': 27 },
		{ 'word': '方式', 'weight': 26 },
		{ 'word': '为', 'weight': 24 },
		{ 'word': '字', 'weight': 24 },
		{ 'word': '了', 'weight': 23 },
		{ 'word': '节', 'weight': 21 },
		{ 'word': '編碼', 'weight': 19 },
		{ 'word': '个', 'weight': 19 },
		{ 'word': '碼', 'weight': 18 },
		{ 'word': '编辑', 'weight': 18 },
		{ 'word': '版本', 'weight': 17 },
		{ 'word': '平面', 'weight': 17 },
		{ 'word': '上', 'weight': 16 },
		{ 'word': '位', 'weight': 16 },
		{ 'word': '可以', 'weight': 16 },
		{ 'word': '集', 'weight': 15 },
		{ 'word': '而', 'weight': 15 },
		{ 'word': '即', 'weight': 15 },
		{ 'word': '標準', 'weight': 14 },
		{ 'word': '是', 'weight': 14 },
		{ 'word': '字元', 'weight': 14 },
		{ 'word': '以', 'weight': 13 },
		{ 'word': '不同', 'weight': 13 },
		{ 'word': '系统', 'weight': 13 },
		{ 'word': '显示', 'weight': 13 },
		{ 'word': '文字', 'weight': 12 },
		{ 'word': '中', 'weight': 12 },
		{ 'word': '实现', 'weight': 12 },
		{ 'word': '統一', 'weight': 11 },
		{ 'word': '或', 'weight': 11 },
		{ 'word': '浏览', 'weight': 11 },
		{ 'word': '器', 'weight': 11 },
		{ 'word': '如', 'weight': 10 },
		{ 'word': '语言', 'weight': 10 },
		{ 'word': '但', 'weight': 10 },
		{ 'word': '一个', 'weight': 10 },
		{ 'word': '代码', 'weight': 10 },
		{ 'word': '其', 'weight': 9 },
		{ 'word': '中文', 'weight': 9 },
		{ 'word': '電腦', 'weight': 9 },
		{ 'word': '來', 'weight': 9 },
		{ 'word': '多', 'weight': 9 },
		{ 'word': '目前', 'weight': 9 },
		{ 'word': '以及', 'weight': 9 },
		{ 'word': '例如', 'weight': 9 },
		{ 'word': '非', 'weight': 8 },
		{ 'word': '為', 'weight': 8 },
		{ 'word': '年', 'weight': 8 },
		{ 'word': '标准', 'weight': 8 },
		{ 'word': '基本', 'weight': 8 },
		{ 'word': '區段', 'weight': 8 },
		{ 'word': '下', 'weight': 8 },
		{ 'word': '与', 'weight': 8 },
		{ 'word': '会', 'weight': 8 },
		{ 'word': '转换', 'weight': 8 },
		{ 'word': '情况', 'weight': 8 },
		{ 'word': '将', 'weight': 8 },
		{ 'word': '页', 'weight': 8 },
		{ 'word': '方案', 'weight': 7 },
		{ 'word': '包含', 'weight': 7 },
		{ 'word': '兼容', 'weight': 7 },
		{ 'word': '对应', 'weight': 7 },
		{ 'word': '所有', 'weight': 7 },
		{ 'word': '表示', 'weight': 7 },
		{ 'word': '文', 'weight': 7 },
		{ 'word': '完全', 'weight': 7 },
		{ 'word': '十六', 'weight': 7 },
		{ 'word': '进制', 'weight': 7 },
		{ 'word': '可能', 'weight': 7 },
		{ 'word': '字体', 'weight': 7 },
		{ 'word': '通用', 'weight': 6 },
		{ 'word': '處理', 'weight': 6 },
		{ 'word': '也', 'weight': 6 },
		{ 'word': '與', 'weight': 6 },
		{ 'word': '可', 'weight': 6 },
		{ 'word': '等', 'weight': 6 },
		{ 'word': '支持', 'weight': 6 },
		{ 'word': '到', 'weight': 6 },
		{ 'word': '會', 'weight': 6 },
		{ 'word': '需要', 'weight': 6 },
		{ 'word': '一致', 'weight': 6 },
		{ 'word': '對應', 'weight': 6 },
		{ 'word': '於', 'weight': 6 },
		{ 'word': '空间', 'weight': 6 },
		{ 'word': '每', 'weight': 6 },
		{ 'word': '各种', 'weight': 6 },
		{ 'word': '这', 'weight': 6 },
		{ 'word': '对', 'weight': 6 },
		{ 'word': '就', 'weight': 6 },
		{ 'word': '采用', 'weight': 6 },
		{ 'word': '系統', 'weight': 5 },
		{ 'word': '由', 'weight': 5 },
		{ 'word': '既有', 'weight': 5 },
		{ 'word': '新', 'weight': 5 },
		{ 'word': '都', 'weight': 5 },
		{ 'word': '第', 'weight': 5 },
		{ 'word': '涵', 'weight': 5 },
		{ 'word': '方法', 'weight': 5 },
		{ 'word': '序', 'weight': 5 },
		{ 'word': '國際', 'weight': 5 },
		{ 'word': '格式', 'weight': 5 },
		{ 'word': '所', 'weight': 5 },
		{ 'word': '數字', 'weight': 5 },
		{ 'word': '其他', 'weight': 5 },
		{ 'word': '用', 'weight': 5 },
		{ 'word': '位元', 'weight': 5 },
		{ 'word': '組織', 'weight': 5 },
		{ 'word': '两', 'weight': 5 },
		{ 'word': '出现', 'weight': 5 },
		{ 'word': '国家', 'weight': 5 },
		{ 'word': '中的', 'weight': 5 },
		{ 'word': '表', 'weight': 5 },
		{ 'word': '问题', 'weight': 5 },
		{ 'word': '機構', 'weight': 4 },
		{ 'word': '聯盟', 'weight': 4 },
		{ 'word': '又', 'weight': 4 },
		{ 'word': '提供', 'weight': 4 },
		{ 'word': '空間', 'weight': 4 },
		{ 'word': '環境', 'weight': 4 },
		{ 'word': '本', 'weight': 4 },
		{ 'word': '月', 'weight': 4 },
		{ 'word': '化', 'weight': 4 },
		{ 'word': '文本', 'weight': 4 },
		{ 'word': '大', 'weight': 4 },
		{ 'word': '語言', 'weight': 4 },
		{ 'word': '解决', 'weight': 4 },
		{ 'word': '一個', 'weight': 4 },
		{ 'word': '工作', 'weight': 4 },
		{ 'word': '各自', 'weight': 4 },
		{ 'word': '相同', 'weight': 4 },
		{ 'word': '組', 'weight': 4 },
		{ 'word': '有些', 'weight': 4 },
		{ 'word': '公司', 'weight': 4 },
		{ 'word': '保持', 'weight': 4 },
		{ 'word': '至', 'weight': 4 },
		{ 'word': '于', 'weight': 4 },
		{ 'word': '实际', 'weight': 4 },
		{ 'word': '占用', 'weight': 4 },
		{ 'word': '理论', 'weight': 4 },
		{ 'word': '种', 'weight': 4 },
		{ 'word': '辅助', 'weight': 4 },
		{ 'word': '由于', 'weight': 4 },
		{ 'word': '如果', 'weight': 4 },
		{ 'word': '对于', 'weight': 4 },
		{ 'word': '按', 'weight': 4 },
		{ 'word': '端', 'weight': 4 },
		{ 'word': '这些', 'weight': 4 },
		{ 'word': '或者', 'weight': 4 },
		{ 'word': '點', 'weight': 4 },
		{ 'word': '无法', 'weight': 4 },
		{ 'word': '部分', 'weight': 4 },
		{ 'word': '一些', 'weight': 4 },
		{ 'word': '相应', 'weight': 4 },
		{ 'word': '即可', 'weight': 4 },
		{ 'word': '输入', 'weight': 4 },
		{ 'word': '统一', 'weight': 3 },
		{ 'word': '技术', 'weight': 3 },
		{ 'word': '能', 'weight': 3 },
		{ 'word': '顯示', 'weight': 3 },
		{ 'word': '間', 'weight': 3 },
		{ 'word': '轉換', 'weight': 3 },
		{ 'word': '更', 'weight': 3 },
		{ 'word': '問題', 'weight': 3 },
		{ 'word': '語', 'weight': 3 },
		{ 'word': '同時', 'weight': 3 },
		{ 'word': '形式', 'weight': 3 },
		{ 'word': '只是', 'weight': 3 },
		{ 'word': '視覺', 'weight': 3 },
		{ 'word': '字形', 'weight': 3 },
		{ 'word': '外', 'weight': 3 },
		{ 'word': '及', 'weight': 3 },
		{ 'word': '呈現', 'weight': 3 },
		{ 'word': '方向', 'weight': 3 },
		{ 'word': '廣泛', 'weight': 3 },
		{ 'word': '很多', 'weight': 3 },
		{ 'word': '扩展', 'weight': 3 },
		{ 'word': '定義', 'weight': 3 },
		{ 'word': '雖然', 'weight': 3 },
		{ 'word': '地', 'weight': 3 },
		{ 'word': '卻', 'weight': 3 },
		{ 'word': '通常', 'weight': 3 },
		{ 'word': '拉丁字母', 'weight': 3 },
		{ 'word': '编', 'weight': 3 },
		{ 'word': '直接', 'weight': 3 },
		{ 'word': '任何', 'weight': 3 },
		{ 'word': '資訊', 'weight': 3 },
		{ 'word': '全形', 'weight': 3 },
		{ 'word': '主要', 'weight': 3 },
		{ 'word': '日文', 'weight': 3 },
		{ 'word': '有', 'weight': 3 },
		{ 'word': '緊', 'weight': 3 },
		{ 'word': '接着', 'weight': 3 },
		{ 'word': '数字', 'weight': 3 },
		{ 'word': '則', 'weight': 3 },
		{ 'word': '必須', 'weight': 3 },
		{ 'word': '個人', 'weight': 3 },
		{ 'word': '擴展', 'weight': 3 },
		{ 'word': '左', 'weight': 3 },
		{ 'word': '右', 'weight': 3 },
		{ 'word': '及其', 'weight': 3 },
		{ 'word': '其中', 'weight': 3 },
		{ 'word': '设计', 'weight': 3 },
		{ 'word': '档', 'weight': 3 },
		{ 'word': '这样', 'weight': 3 },
		{ 'word': '作为', 'weight': 3 },
		{ 'word': '未来', 'weight': 3 },
		{ 'word': '盖', 'weight': 3 },
		{ 'word': '首位', 'weight': 3 },
		{ 'word': '后', 'weight': 3 },
		{ 'word': '平台', 'weight': 3 },
		{ 'word': '仅', 'weight': 3 },
		{ 'word': '这种', 'weight': 3 },
		{ 'word': '遇到', 'weight': 3 },
		{ 'word': '一定', 'weight': 3 },
		{ 'word': '通过', 'weight': 3 },
		{ 'word': '时', 'weight': 3 },
		{ 'word': '从', 'weight': 3 },
		{ 'word': '那么', 'weight': 3 },
		{ 'word': '则', 'weight': 3 },
		{ 'word': '成', 'weight': 3 },
		{ 'word': '地区', 'weight': 3 },
		{ 'word': '选择', 'weight': 3 },
		{ 'word': '映射', 'weight': 3 },
		{ 'word': '個', 'weight': 3 },
		{ 'word': '一', 'weight': 3 },
		{ 'word': '环境', 'weight': 3 },
		{ 'word': '来', 'weight': 3 },
		{ 'word': '码', 'weight': 3 },
		{ 'word': '安装', 'weight': 3 },
		{ 'word': '十进制', 'weight': 3 },
		{ 'word': '你', 'weight': 3 },
		{ 'word': '另外', 'weight': 3 },
		{ 'word': '引用', 'weight': 3 },
		{ 'word': '輸入法', 'weight': 3 },
		{ 'word': '代', 'weight': 3 },
		{ 'word': '輸入', 'weight': 3 },
		{ 'word': '全', 'weight': 2 },
		{ 'word': '官方', 'weight': 2 },
		{ 'word': '所用', 'weight': 2 },
		{ 'word': '名称', 'weight': 2 },
		{ 'word': '作', 'weight': 2 },
		{ 'word': '字元碼', 'weight': 2 },
		{ 'word': '使得', 'weight': 2 },
		{ 'word': '一種', 'weight': 2 },
		{ 'word': '跨', 'weight': 2 },
		{ 'word': '解決', 'weight': 2 },
		{ 'word': '不', 'weight': 2 },
		{ 'word': '發展', 'weight': 2 },
		{ 'word': '每個', 'weight': 2 },
		{ 'word': '加入', 'weight': 2 },
		{ 'word': '最新', 'weight': 2 },
		{ 'word': '十萬個', 'weight': 2 },
		{ 'word': '指定', 'weight': 2 },
		{ 'word': '代碼', 'weight': 2 },
		{ 'word': '除了', 'weight': 2 },
		{ 'word': '蓋', 'weight': 2 },
		{ 'word': '還', 'weight': 2 },
		{ 'word': '各', 'weight': 2 },
		{ 'word': '細節', 'weight': 2 },
		{ 'word': '拆', 'weight': 2 },
		{ 'word': '特性', 'weight': 2 },
		{ 'word': '此外', 'weight': 2 },
		{ 'word': '開發', 'weight': 2 },
		{ 'word': '完整', 'weight': 2 },
		{ 'word': '软件', 'weight': 2 },
		{ 'word': '本地', 'weight': 2 },
		{ 'word': '标', 'weight': 2 },
		{ 'word': '普遍', 'weight': 2 },
		{ 'word': '傳統', 'weight': 2 },
		{ 'word': '國家', 'weight': 2 },
		{ 'word': '情況', 'weight': 2 },
		{ 'word': '支援', 'weight': 2 },
		{ 'word': '指', 'weight': 2 },
		{ 'word': '混合', 'weight': 2 },
		{ 'word': '然而', 'weight': 2 },
		{ 'word': '方面', 'weight': 2 },
		{ 'word': '形', 'weight': 2 },
		{ 'word': '中日', 'weight': 2 },
		{ 'word': '表意文字', 'weight': 2 },
		{ 'word': '字體', 'weight': 2 },
		{ 'word': '大小', 'weight': 2 },
		{ 'word': '并', 'weight': 2 },
		{ 'word': '保留', 'weight': 2 },
		{ 'word': '使', 'weight': 2 },
		{ 'word': '大量', 'weight': 2 },
		{ 'word': '互相', 'weight': 2 },
		{ 'word': '不會', 'weight': 2 },
		{ 'word': '這些', 'weight': 2 },
		{ 'word': '時', 'weight': 2 },
		{ 'word': '然後', 'weight': 2 },
		{ 'word': '種', 'weight': 2 },
		{ 'word': '裏', 'weight': 2 },
		{ 'word': '四', 'weight': 2 },
		{ 'word': '共', 'weight': 2 },
		{ 'word': '多個', 'weight': 2 },
		{ 'word': '微軟', 'weight': 2 },
		{ 'word': '標準化', 'weight': 2 },
		{ 'word': '前提', 'weight': 2 },
		{ 'word': '目的', 'weight': 2 },
		{ 'word': '兩者', 'weight': 2 },
		{ 'word': '自', 'weight': 2 },
		{ 'word': '縮減', 'weight': 2 },
		{ 'word': '若', 'weight': 2 },
		{ 'word': '姆', 'weight': 2 },
		{ 'word': '發佈', 'weight': 2 },
		{ 'word': '閱讀', 'weight': 2 },
		{ 'word': '截至', 'weight': 2 },
		{ 'word': '大概', 'weight': 2 },
		{ 'word': '分为', 'weight': 2 },
		{ 'word': '十大', 'weight': 2 },
		{ 'word': '原则', 'weight': 2 },
		{ 'word': '概念', 'weight': 2 },
		{ 'word': '应用', 'weight': 2 },
		{ 'word': '最多', 'weight': 2 },
		{ 'word': '上述', 'weight': 2 },
		{ 'word': '定义', 'weight': 2 },
		{ 'word': '两者', 'weight': 2 },
		{ 'word': '起来', 'weight': 2 },
		{ 'word': '占据', 'weight': 2 },
		{ 'word': '少', 'weight': 2 },
		{ 'word': '扩充', 'weight': 2 },
		{ 'word': '加上', 'weight': 2 },
		{ 'word': '代表', 'weight': 2 },
		{ 'word': '传输', 'weight': 2 },
		{ 'word': '节省', 'weight': 2 },
		{ 'word': '第一', 'weight': 2 },
		{ 'word': '比较', 'weight': 2 },
		{ 'word': '算法', 'weight': 2 },
		{ 'word': '利用', 'weight': 2 },
		{ 'word': '识别', 'weight': 2 },
		{ 'word': '主', 'weight': 2 },
		{ 'word': '具体', 'weight': 2 },
		{ 'word': '参见', 'weight': 2 },
		{ 'word': '再', 'weight': 2 },
		{ 'word': '顺序', 'weight': 2 },
		{ 'word': '不一致', 'weight': 2 },
		{ 'word': '同一', 'weight': 2 },
		{ 'word': '读', 'weight': 2 },
		{ 'word': '取', 'weight': 2 },
		{ 'word': '开始', 'weight': 2 },
		{ 'word': '找到', 'weight': 2 },
		{ 'word': '奎', 'weight': 2 },
		{ 'word': '乙', 'weight': 2 },
		{ 'word': '简写', 'weight': 2 },
		{ 'word': '小', 'weight': 2 },
		{ 'word': '默认', 'weight': 2 },
		{ 'word': '还', 'weight': 2 },
		{ 'word': '包括', 'weight': 2 },
		{ 'word': '微软', 'weight': 2 },
		{ 'word': '集中', 'weight': 2 },
		{ 'word': '第二', 'weight': 2 },
		{ 'word': '第三', 'weight': 2 },
		{ 'word': '简体', 'weight': 2 },
		{ 'word': '繁体', 'weight': 2 },
		{ 'word': '越南', 'weight': 2 },
		{ 'word': '性', 'weight': 2 },
		{ 'word': '要', 'weight': 2 },
		{ 'word': '之前', 'weight': 2 },
		{ 'word': '东亚', 'weight': 2 },
		{ 'word': '复杂', 'weight': 2 },
		{ 'word': '相關', 'weight': 2 },
		{ 'word': '倍數', 'weight': 2 },
		{ 'word': '很可能', 'weight': 2 },
		{ 'word': '正常', 'weight': 2 },
		{ 'word': '设置', 'weight': 2 },
		{ 'word': '现在', 'weight': 2 },
		{ 'word': '网页', 'weight': 2 },
		{ 'word': '电脑', 'weight': 2 },
		{ 'word': '合适', 'weight': 2 },
		{ 'word': '该', 'weight': 2 },
		{ 'word': '旧版', 'weight': 2 },
		{ 'word': '只', 'weight': 2 },
		{ 'word': '标志', 'weight': 2 },
		{ 'word': '内码', 'weight': 2 },
		{ 'word': '即使', 'weight': 2 },
		{ 'word': '也不', 'weight': 2 },
		{ 'word': '只能', 'weight': 2 },
		{ 'word': '预先', 'weight': 2 },
		{ 'word': '一种', 'weight': 2 },
		{ 'word': '实体', 'weight': 2 },
		{ 'word': '操作', 'weight': 2 },
		{ 'word': '点', 'weight': 2 },
		{ 'word': '击', 'weight': 2 },
		{ 'word': '键', 'weight': 2 },
		{ 'word': '得到', 'weight': 2 },
		{ 'word': '稱為', 'weight': 1 },
		{ 'word': '译', 'weight': 1 },
		{ 'word': '萬國', 'weight': 1 },
		{ 'word': '信息', 'weight': 1 },
		{ 'word': '領域', 'weight': 1 },
		{ 'word': '業界', 'weight': 1 },
		{ 'word': '整理', 'weight': 1 },
		{ 'word': '世界上', 'weight': 1 },
		{ 'word': '大部分', 'weight': 1 },
		{ 'word': '劃一', 'weight': 1 },
		{ 'word': '不但', 'weight': 1 },
		{ 'word': '減輕', 'weight': 1 },
		{ 'word': '切換', 'weight': 1 },
		{ 'word': '困擾', 'weight': 1 },
		{ 'word': '平臺', 'weight': 1 },
		{ 'word': '亂碼', 'weight': 1 },
		{ 'word': '營利', 'weight': 1 },
		{ 'word': '負責', 'weight': 1 },
		{ 'word': '維護', 'weight': 1 },
		{ 'word': '該', 'weight': 1 },
		{ 'word': '致力', 'weight': 1 },
		{ 'word': '讓', 'weight': 1 },
		{ 'word': '取代', 'weight': 1 },
		{ 'word': '因為', 'weight': 1 },
		{ 'word': '有限', 'weight': 1 },
		{ 'word': '亦', 'weight': 1 },
		{ 'word': '適用於', 'weight': 1 },
		{ 'word': '伴隨著', 'weight': 1 },
		{ 'word': '書', 'weight': 1 },
		{ 'word': '對外', 'weight': 1 },
		{ 'word': '發表', 'weight': 1 },
		{ 'word': '至今', 'weight': 1 },
		{ 'word': '仍在', 'weight': 1 },
		{ 'word': '不斷', 'weight': 1 },
		{ 'word': '增', 'weight': 1 },
		{ 'word': '修', 'weight': 1 },
		{ 'word': '更多', 'weight': 1 },
		{ 'word': '新的', 'weight': 1 },
		{ 'word': '公布', 'weight': 1 },
		{ 'word': '已經', 'weight': 1 },
		{ 'word': '收錄', 'weight': 1 },
		{ 'word': '超過', 'weight': 1 },
		{ 'word': '萬個', 'weight': 1 },
		{ 'word': '獲', 'weight': 1 },
		{ 'word': '採納', 'weight': 1 },
		{ 'word': '不僅僅', 'weight': 1 },
		{ 'word': '资料', 'weight': 1 },
		{ 'word': '出版', 'weight': 1 },
		{ 'word': '品', 'weight': 1 },
		{ 'word': '關於', 'weight': 1 },
		{ 'word': '書寫', 'weight': 1 },
		{ 'word': '系統的', 'weight': 1 },
		{ 'word': '規格', 'weight': 1 },
		{ 'word': '準則', 'weight': 1 },
		{ 'word': '分', 'weight': 1 },
		{ 'word': '定', 'weight': 1 },
		{ 'word': '繪製', 'weight': 1 },
		{ 'word': '雙向', 'weight': 1 },
		{ 'word': '书写', 'weight': 1 },
		{ 'word': '小寫字母', 'weight': 1 },
		{ 'word': '等等', 'weight': 1 },
		{ 'word': '參考', 'weight': 1 },
		{ 'word': '資料', 'weight': 1 },
		{ 'word': '圖像', 'weight': 1 },
		{ 'word': '幫助', 'weight': 1 },
		{ 'word': '者', 'weight': 1 },
		{ 'word': '設計師', 'weight': 1 },
		{ 'word': '正確', 'weight': 1 },
		{ 'word': '應用', 'weight': 1 },
		{ 'word': '備受', 'weight': 1 },
		{ 'word': '認可', 'weight': 1 },
		{ 'word': '納入', 'weight': 1 },
		{ 'word': '国际', 'weight': 1 },
		{ 'word': '成為', 'weight': 1 },
		{ 'word': '各个', 'weight': 1 },
		{ 'word': '應用於', 'weight': 1 },
		{ 'word': '過程', 'weight': 1 },
		{ 'word': '科技', 'weight': 1 },
		{ 'word': '置', 'weight': 1 },
		{ 'word': '簡稱', 'weight': 1 },
		{ 'word': '程式', 'weight': 1 },
		{ 'word': '現代', 'weight': 1 },
		{ 'word': '作業系統', 'weight': 1 },
		{ 'word': '採用', 'weight': 1 },
		{ 'word': '最', 'weight': 1 },
		{ 'word': '起源', 'weight': 1 },
		{ 'word': '侷限', 'weight': 1 },
		{ 'word': '產生', 'weight': 1 },
		{ 'word': '可是', 'weight': 1 },
		{ 'word': '經常', 'weight': 1 },
		{ 'word': '出現', 'weight': 1 },
		{ 'word': '不相容', 'weight': 1 },
		{ 'word': '都有', 'weight': 1 },
		{ 'word': '共同', 'weight': 1 },
		{ 'word': '容許', 'weight': 1 },
		{ 'word': '雙', 'weight': 1 },
		{ 'word': '無法', 'weight': 1 },
		{ 'word': '多種', 'weight': 1 },
		{ 'word': '寫法', 'weight': 1 },
		{ 'word': '強', 'weight': 1 },
		{ 'word': '强', 'weight': 1 },
		{ 'word': '戶', 'weight': 1 },
		{ 'word': '户', 'weight': 1 },
		{ 'word': '戸', 'weight': 1 },
		{ 'word': '汉字', 'weight': 1 },
		{ 'word': '引起', 'weight': 1 },
		{ 'word': '一字', 'weight': 1 },
		{ 'word': '認定', 'weight': 1 },
		{ 'word': '爭議', 'weight': 1 },
		{ 'word': '詳', 'weight': 1 },
		{ 'word': '見', 'weight': 1 },
		{ 'word': '韓', 'weight': 1 },
		{ 'word': '每一個', 'weight': 1 },
		{ 'word': '唯一', 'weight': 1 },
		{ 'word': '整數', 'weight': 1 },
		{ 'word': '換句話說', 'weight': 1 },
		{ 'word': '抽象', 'weight': 1 },
		{ 'word': '並將', 'weight': 1 },
		{ 'word': '演繹', 'weight': 1 },
		{ 'word': '外觀', 'weight': 1 },
		{ 'word': '形狀', 'weight': 1 },
		{ 'word': '形態', 'weight': 1 },
		{ 'word': '文體', 'weight': 1 },
		{ 'word': '留給', 'weight': 1 },
		{ 'word': '軟件', 'weight': 1 },
		{ 'word': '網頁', 'weight': 1 },
		{ 'word': '瀏覽器', 'weight': 1 },
		{ 'word': '或是', 'weight': 1 },
		{ 'word': '處理器', 'weight': 1 },
		{ 'word': '幾乎', 'weight': 1 },
		{ 'word': '为了', 'weight': 1 },
		{ 'word': '它們', 'weight': 1 },
		{ 'word': '相互', 'weight': 1 },
		{ 'word': '首', 'weight': 1 },
		{ 'word': '給', 'weight': 1 },
		{ 'word': '西歐', 'weight': 1 },
		{ 'word': '語系', 'weight': 1 },
		{ 'word': '不需', 'weight': 1 },
		{ 'word': '特別', 'weight': 1 },
		{ 'word': '考量', 'weight': 1 },
		{ 'word': '并且', 'weight': 1 },
		{ 'word': '把', 'weight': 1 },
		{ 'word': '重複', 'weight': 1 },
		{ 'word': '編', 'weight': 1 },
		{ 'word': '去', 'weight': 1 },
		{ 'word': '舊有', 'weight': 1 },
		{ 'word': '紛雜', 'weight': 1 },
		{ 'word': '得以', 'weight': 1 },
		{ 'word': '遺失', 'weight': 1 },
		{ 'word': '舉例來說', 'weight': 1 },
		{ 'word': '韓文', 'weight': 1 },
		{ 'word': '當中', 'weight': 1 },
		{ 'word': '而不', 'weight': 1 },
		{ 'word': '常見', 'weight': 1 },
		{ 'word': '半', 'weight': 1 },
		{ 'word': '這對', 'weight': 1 },
		{ 'word': '豎', 'weight': 1 },
		{ 'word': '排', 'weight': 1 },
		{ 'word': '寬', 'weight': 1 },
		{ 'word': '排列', 'weight': 1 },
		{ 'word': '重要', 'weight': 1 },
		{ 'word': '作用', 'weight': 1 },
		{ 'word': '一組', 'weight': 1 },
		{ 'word': '十六進位', 'weight': 1 },
		{ 'word': '這一個', 'weight': 1 },
		{ 'word': '要用', 'weight': 1 },
		{ 'word': '六萬', 'weight': 1 },
		{ 'word': '零號', 'weight': 1 },
		{ 'word': '以外', 'weight': 1 },
		{ 'word': '五', 'weight': 1 },
		{ 'word': '六個', 'weight': 1 },
		{ 'word': '舊', 'weight': 1 },
		{ 'word': '版', 'weight': 1 },
		{ 'word': '相近', 'weight': 1 },
		{ 'word': '標記', 'weight': 1 },
		{ 'word': '微小', 'weight': 1 },
		{ 'word': '差異', 'weight': 1 },
		{ 'word': '八個', 'weight': 1 },
		{ 'word': '隨後', 'weight': 1 },
		{ 'word': '四個', 'weight': 1 },
		{ 'word': '位於', 'weight': 1 },
		{ 'word': '美國', 'weight': 1 },
		{ 'word': '加州', 'weight': 1 },
		{ 'word': '允許', 'weight': 1 },
		{ 'word': '願意', 'weight': 1 },
		{ 'word': '支付', 'weight': 1 },
		{ 'word': '會費', 'weight': 1 },
		{ 'word': '成員', 'weight': 1 },
		{ 'word': '軟', 'weight': 1 },
		{ 'word': '硬體', 'weight': 1 },
		{ 'word': '廠商', 'weight': 1 },
		{ 'word': '蘋果', 'weight': 1 },
		{ 'word': '惠', 'weight': 1 },
		{ 'word': '普', 'weight': 1 },
		{ 'word': '施', 'weight': 1 },
		{ 'word': '乐', 'weight': 1 },
		{ 'word': '世纪', 'weight': 1 },
		{ 'word': '年代', 'weight': 1 },
		{ 'word': '末', 'weight': 1 },
		{ 'word': '組成', 'weight': 1 },
		{ 'word': '商業', 'weight': 1 },
		{ 'word': '合作', 'weight': 1 },
		{ 'word': '普及', 'weight': 1 },
		{ 'word': '分別', 'weight': 1 },
		{ 'word': '成立', 'weight': 1 },
		{ 'word': '小組', 'weight': 1 },
		{ 'word': '他們', 'weight': 1 },
		{ 'word': '不久', 'weight': 1 },
		{ 'word': '便', 'weight': 1 },
		{ 'word': '發現', 'weight': 1 },
		{ 'word': '對方', 'weight': 1 },
		{ 'word': '存在', 'weight': 1 },
		{ 'word': '大家', 'weight': 1 },
		{ 'word': '同意', 'weight': 1 },
		{ 'word': '碼表', 'weight': 1 },
		{ 'word': '並', 'weight': 1 },
		{ 'word': '密切', 'weight': 1 },
		{ 'word': '協調', 'weight': 1 },
		{ 'word': '進一步', 'weight': 1 },
		{ 'word': '實際上', 'weight': 1 },
		{ 'word': '本質', 'weight': 1 },
		{ 'word': '確', 'weight': 1 },
		{ 'word': '附錄', 'weight': 1 },
		{ 'word': '開始', 'weight': 1 },
		{ 'word': '向後', 'weight': 1 },
		{ 'word': '僅', 'weight': 1 },
		{ 'word': '增加', 'weight': 1 },
		{ 'word': '原有', 'weight': 1 },
		{ 'word': '删除', 'weight': 1 },
		{ 'word': '更名', 'weight': 1 },
		{ 'word': '但從', 'weight': 1 },
		{ 'word': '起', 'weight': 1 },
		{ 'word': '沒有', 'weight': 1 },
		{ 'word': '已有', 'weight': 1 },
		{ 'word': '佔用', 'weight': 1 },
		{ 'word': '不可', 'weight': 1 },
		{ 'word': '以來', 'weight': 1 },
		{ 'word': '阿', 'weight': 1 },
		{ 'word': '洪', 'weight': 1 },
		{ 'word': '首次', 'weight': 1 },
		{ 'word': '結合', 'weight': 1 },
		{ 'word': '制定', 'weight': 1 },
		{ 'word': '運作', 'weight': 1 },
		{ 'word': '原理', 'weight': 1 },
		{ 'word': '詳盡', 'weight': 1 },
		{ 'word': '實現', 'weight': 1 },
		{ 'word': '主題', 'weight': 1 },
		{ 'word': '諸如', 'weight': 1 },
		{ 'word': '校對', 'weight': 1 },
		{ 'word': '列舉', 'weight': 1 },
		{ 'word': '諸多', 'weight': 1 },
		{ 'word': '兩種', 'weight': 1 },
		{ 'word': '阿拉伯文', 'weight': 1 },
		{ 'word': '兩個', 'weight': 1 },
		{ 'word': '術語', 'weight': 1 },
		{ 'word': '微', 'weight': 1 },
		{ 'word': '用於', 'weight': 1 },
		{ 'word': '馬拉', 'weight': 1 },
		{ 'word': '雅', 'weight': 1 },
		{ 'word': '拉', 'weight': 1 },
		{ 'word': '引入', 'weight': 1 },
		{ 'word': '历史', 'weight': 1 },
		{ 'word': '時間', 'weight': 1 },
		{ 'word': '如下', 'weight': 1 },
		{ 'word': '因應', 'weight': 1 },
		{ 'word': '冠狀', 'weight': 1 },
		{ 'word': '病毒', 'weight': 1 },
		{ 'word': '病', 'weight': 1 },
		{ 'word': '疫', 'weight': 1 },
		{ 'word': '情', 'weight': 1 },
		{ 'word': '延後', 'weight': 1 },
		{ 'word': '发布', 'weight': 1 },
		{ 'word': '来说', 'weight': 1 },
		{ 'word': '层次', 'weight': 1 },
		{ 'word': '给', 'weight': 1 },
		{ 'word': '出了', 'weight': 1 },
		{ 'word': '相', 'weight': 1 },
		{ 'word': '也就是', 'weight': 1 },
		{ 'word': '一共', 'weight': 1 },
		{ 'word': '满足', 'weight': 1 },
		{ 'word': '並未', 'weight': 1 },
		{ 'word': '而是', 'weight': 1 },
		{ 'word': '特殊', 'weight': 1 },
		{ 'word': '将来', 'weight': 1 },
		{ 'word': '构成', 'weight': 1 },
		{ 'word': '未', 'weight': 1 },
		{ 'word': '合', 'weight': 1 },
		{ 'word': '至少', 'weight': 1 },
		{ 'word': '比', 'weight': 1 },
		{ 'word': '略', 'weight': 1 },
		{ 'word': '事实', 'weight': 1 },
		{ 'word': '仍然', 'weight': 1 },
		{ 'word': '级别', 'weight': 1 },
		{ 'word': '更大', 'weight': 1 },
		{ 'word': '尚未', 'weight': 1 },
		{ 'word': '填充', 'weight': 1 },
		{ 'word': '恒', 'weight': 1 },
		{ 'word': '共需', 'weight': 1 },
		{ 'word': '一切', 'weight': 1 },
		{ 'word': '符号', 'weight': 1 },
		{ 'word': '前', 'weight': 1 },
		{ 'word': '均', 'weight': 1 },
		{ 'word': '确定', 'weight': 1 },
		{ 'word': '但是', 'weight': 1 },
		{ 'word': '过程', 'weight': 1 },
		{ 'word': '不一定', 'weight': 1 },
		{ 'word': '出于', 'weight': 1 },
		{ 'word': '有所不同', 'weight': 1 },
		{ 'word': '称为', 'weight': 1 },
		{ 'word': '简称', 'weight': 1 },
		{ 'word': '文件', 'weight': 1 },
		{ 'word': '原', 'weight': 1 },
		{ 'word': '始终', 'weight': 1 },
		{ 'word': '造成', 'weight': 1 },
		{ 'word': '浪费', 'weight': 1 },
		{ 'word': '变长', 'weight': 1 },
		{ 'word': '它', 'weight': 1 },
		{ 'word': '仍', 'weight': 1 },
		{ 'word': '补', 'weight': 1 },
		{ 'word': '西文', 'weight': 1 },
		{ 'word': '大幅', 'weight': 1 },
		{ 'word': '长度', 'weight': 1 },
		{ 'word': '类似', 'weight': 1 },
		{ 'word': '限于', 'weight': 1 },
		{ 'word': '麥金塔', 'weight': 1 },
		{ 'word': '机', 'weight': 1 },
		{ 'word': '理解', 'weight': 1 },
		{ 'word': '这时', 'weight': 1 },
		{ 'word': '流', 'weight': 1 },
		{ 'word': '解释', 'weight': 1 },
		{ 'word': '内容', 'weight': 1 },
		{ 'word': '某', 'weight': 1 },
		{ 'word': '低', 'weight': 1 },
		{ 'word': '认为', 'weight': 1 },
		{ 'word': '此', 'weight': 1 },
		{ 'word': '高', 'weight': 1 },
		{ 'word': '就是', 'weight': 1 },
		{ 'word': '说', 'weight': 1 },
		{ 'word': '保存', 'weight': 1 },
		{ 'word': '開啟', 'weight': 1 },
		{ 'word': '此类', 'weight': 1 },
		{ 'word': '说明', 'weight': 1 },
		{ 'word': '加以', 'weight': 1 },
		{ 'word': '人为', 'weight': 1 },
		{ 'word': '发生', 'weight': 1 },
		{ 'word': '混淆', 'weight': 1 },
		{ 'word': '于是', 'weight': 1 },
		{ 'word': '附加', 'weight': 1 },
		{ 'word': '順序', 'weight': 1 },
		{ 'word': '記號', 'weight': 1 },
		{ 'word': '属于', 'weight': 1 },
		{ 'word': '规划', 'weight': 1 },
		{ 'word': '附带', 'weight': 1 },
		{ 'word': '记事', 'weight': 1 },
		{ 'word': '另', 'weight': 1 },
		{ 'word': '存', 'weight': 1 },
		{ 'word': '对话', 'weight': 1 },
		{ 'word': '框', 'weight': 1 },
		{ 'word': '除去', 'weight': 1 },
		{ 'word': '英文', 'weight': 1 },
		{ 'word': '则为', 'weight': 1 },
		{ 'word': '其余', 'weight': 1 },
		{ 'word': '三', 'weight': 1 },
		{ 'word': '韩', 'weight': 1 },
		{ 'word': '因此', 'weight': 1 },
		{ 'word': '韩文', 'weight': 1 },
		{ 'word': '喃', 'weight': 1 },
		{ 'word': '协调', 'weight': 1 },
		{ 'word': '受', 'weight': 1 },
		{ 'word': '重点', 'weight': 1 },
		{ 'word': '关注', 'weight': 1 },
		{ 'word': '考虑', 'weight': 1 },
		{ 'word': '最终', 'weight': 1 },
		{ 'word': '某种', 'weight': 1 },
		{ 'word': '意义', 'weight': 1 },
		{ 'word': '而言', 'weight': 1 },
		{ 'word': '视', 'weight': 1 },
		{ 'word': '既成事实', 'weight': 1 },
		{ 'word': '如同', 'weight': 1 },
		{ 'word': '一样', 'weight': 1 },
		{ 'word': '各位', 'weight': 1 },
		{ 'word': '与原', 'weight': 1 },
		{ 'word': '关系', 'weight': 1 },
		{ 'word': '得', 'weight': 1 },
		{ 'word': '条目', 'weight': 1 },
		{ 'word': '將', 'weight': 1 },
		{ 'word': '分成', 'weight': 1 },
		{ 'word': '編號', 'weight': 1 },
		{ 'word': '說', 'weight': 1 },
		{ 'word': '都可以', 'weight': 1 },
		{ 'word': '單位', 'weight': 1 },
		{ 'word': '話', 'weight': 1 },
		{ 'word': '二', 'weight': 1 },
		{ 'word': '三個', 'weight': 1 },
		{ 'word': '稱', 'weight': 1 },
		{ 'word': '輔助', 'weight': 1 },
		{ 'word': '代理', 'weight': 1 },
		{ 'word': '對', 'weight': 1 },
		{ 'word': '則會', 'weight': 1 },
		{ 'word': '個位', 'weight': 1 },
		{ 'word': '元', 'weight': 1 },
		{ 'word': '先將', 'weight': 1 },
		{ 'word': '集結', 'weight': 1 },
		{ 'word': '任意', 'weight': 1 },
		{ 'word': '且', 'weight': 1 },
		{ 'word': '一份', 'weight': 1 },
		{ 'word': '文稿', 'weight': 1 },
		{ 'word': '可能會', 'weight': 1 },
		{ 'word': '散布', 'weight': 1 },
		{ 'word': '过渡', 'weight': 1 },
	],
}

export default config
