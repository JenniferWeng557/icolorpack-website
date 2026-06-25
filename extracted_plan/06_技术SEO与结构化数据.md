# 技术SEO与结构化数据整改

## 1. 必须检查

- sitemap.xml 是否存在并提交到 Google Search Console
- robots.txt 是否允许 Googlebot 抓取核心页面
- 所有页面是否有唯一 Title
- 所有页面是否有唯一 Meta Description
- 每页只有一个 H1
- canonical 是否正确
- 404 页面是否存在
- 产品页 URL 是否简洁
- 图片是否有 alt 文本
- 移动端是否正常显示
- 页面速度是否达标

## 2. URL 规范

正确：
/custom-paper-bags-with-logo
/custom-rigid-gift-boxes-wholesale
/packaging-for-cosmetics-brands

避免：
/product?id=123
/blog/post-1
/custom_product_page_final_2026

## 3. 图片 SEO

每张产品图命名：
custom-paper-bags-with-logo-gold-foil.jpg
custom-rigid-gift-boxes-magnetic-closure.jpg

Alt 文本：
Custom paper bags with logo and gold foil for boutique retail brands

## 4. 结构化数据

需要加入：

1. Organization Schema
2. Product Schema
3. FAQ Schema
4. Breadcrumb Schema
5. Article Schema

示例文件见 schema_samples 文件夹。

## 5. 页面速度

目标：
- 移动端 LCP < 2.5s
- CLS < 0.1
- INP 尽量低
- 图片 WebP/AVIF
- Lazy load 非首屏图片
- 压缩 JS 和 CSS
- 避免大图直接加载

## 6. 内链策略

首页链接到：
- 所有核心产品页
- 所有行业页
- 询盘页
- 采购指南博客

产品页链接到：
- 相关产品页
- 行业页
- 博客
- 询盘表单

博客链接到：
- 对应产品页
- 对应行业页
- 询盘页

## 7. Search Console 监控

每周导出：
- 查询词
- 曝光
- 点击
- 平均排名
- CTR
- 页面

优化规则：
- 有曝光无点击：改 Title 和 Meta Description
- 有点击无询盘：改页面内容和 CTA
- 无曝光：补内容和内链
