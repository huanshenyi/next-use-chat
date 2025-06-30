# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## コードベースの概要

このプロジェクトは **Mastra** フレームワークを使用した Next.js アプリケーションで、AI エージェントとチャット機能を提供します。

## 開発コマンド

```bash
# 開発サーバーを起動（Turbopack使用）
npm run dev

# プロダクション用ビルド
npm run build

# プロダクションサーバーを起動
npm start

# ESLintでコード品質チェック
npm run lint
```

## プロジェクトアーキテクチャ

### Mastraフレームワーク
- **エージェント**: 天気に関する質問に答えるChatAgentが実装されています (`src/mastra/agents/weather-agent.ts`)
- **ツール**: Open Meteo APIを使用した天気データ取得ツール (`src/mastra/tools/weather-tool.ts`)
- **ワークフロー**: 天気情報の取得とアクティビティ提案のワークフロー (`src/mastra/workflows/weather-workflow.ts`)

### メインコンポーネント
- **Chat API**: `/api/chat`エンドポイントでエージェントとの通信を処理 (`src/app/api/chat/route.ts`)
- **Chat UI**: React フロントエンドコンポーネント (`src/app/components/Chat.tsx`)
- **Mastra設定**: エージェント、ワークフロー、ストレージの設定 (`src/mastra/index.ts`)

### テレメトリとモニタリング
- **OpenTelemetry**: パフォーマンス監視とトレーシング (`src/instrumentation.ts`)
- **Langfuse**: AI操作のログと分析
- **Pino Logger**: 構造化ログ出力

### メモリとストレージ
- **LibSQL**: エージェントの記憶機能用データベース
- **Memory システム**: 最近のメッセージ、セマンティック検索、スレッド管理をサポート

### 環境変数
プロジェクトで使用される主な環境変数：
- `memoryStorageUrl`: LibSQLデータベースのURL
- `memoryToken`: データベース認証トークン
- `LANGFUSE_PUBLIC_KEY`: Langfuse公開キー
- `LANGFUSE_SECRET_KEY`: Langfuse秘密キー
- `LANGFUSE_BASEURL`: LangfuseベースURL

## 重要な技術スタック
- **フレームワーク**: Next.js 15（App Router）
- **AI/ML**: OpenAI GPT-4o、Mastraエージェント
- **UI**: React 19、Tailwind CSS
- **データベース**: LibSQL
- **監視**: OpenTelemetry、Langfuse
- **天気API**: Open Meteo API

## 開発時の注意点
- エージェントとツールは `src/mastra/` ディレクトリに分離されています
- チャット機能は実験的な `experimental_prepareRequestBody` を使用して最新メッセージのみを送信しています
- メモリ機能は10件の最新メッセージとセマンティック検索（topK=3）を使用します